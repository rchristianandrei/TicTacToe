import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import lobbyRepo from "../repo/lobbyRepo";
import userRepo from "../repo/userRepo";
import { users } from "../ws";

export const ROUTE = "/api/lobby";
export const router = Router();

router.post("/create", authGuard(), async (req, res) => {
  const user: any = req.user;
  if (!user) return;

  try {
    let lobby = await lobbyRepo.getLobbyByOwnerId(user.id);

    if (!lobby) {
      lobby = await lobbyRepo.createLobby(
        user.id,
        Math.floor(Math.random() * 900000 + 100000).toString()
      );
    }

    let opponentName = "";
    if (lobby.challenger) {
      const opponent = await userRepo.findUserById(
        lobby.challenger?.toString()
      );
      if (opponent) opponentName = opponent.displayName;
    }

    res
      .status(200)
      .send({ roomNumber: lobby.roomNumber, opponentName: opponentName });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to create / retrieve lobby" });
  }
});

router.put("/join", authGuard(), async (req, res) => {
  const user: any = req.user;
  const roomNumber = req.body.roomNumber;

  try {
    // Check if user is already in a lobby
    let lobby = await lobbyRepo.getLobbyByChallengerId(user.id.toString());

    // Check if roomnumber is available
    if (!lobby) {
      lobby = await lobbyRepo.getLobbyByRoomNumber(roomNumber);
    }

    if (!lobby) {
      res.status(404).send({ message: "Lobby not found" });
      return;
    }

    if (lobby.owner.toString() === user.id.toString()) {
      res.status(400).send({ message: "Can't join your own lobby" });
      return;
    }

    if (lobby.challenger) {
      if (lobby.challenger?.toString() !== user.id.toString()) {
        res.status(400).send({ message: "Lobby is full" });
        return;
      }
    } else {
      await lobbyRepo.joinLobby(user.id, roomNumber);
    }

    const opponent = await userRepo.findUserById(lobby.owner.toString());

    if (!opponent) {
      res.status(404).send({ message: "Opponent not found" });
      return;
    }

    const hostWS = users.get(opponent.id);
    if (hostWS) {
      hostWS.send(
        JSON.stringify({ type: "joinLobby", opponent: user.displayName })
      );
    }

    res
      .status(200)
      .send({ opponent: opponent?.displayName, roomNumber: lobby.roomNumber });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to join the lobby" });
  }
});

router.delete("/:roomNumber", authGuard(), async (req, res) => {
  const roomNumber = req.params.roomNumber;

  if (!roomNumber) {
    res.status(400).send({ message: "Room number can't be empty" });
    return;
  }

  try {
    // Check if room exists
    const lobby = await lobbyRepo.getLobbyByRoomNumber(roomNumber);

    if (!lobby) {
      res.status(400).send({ message: "Lobby does not exist" });
      return;
    }

    // Check if there's an opponent
    if (lobby.challenger) {
      const ws = users.get(lobby.challenger.toString());
      ws?.send(JSON.stringify({ type: "lobby closed" }));
    }

    await lobbyRepo.deleteLobby(roomNumber);
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to delete the lobby" });
  }
});

export default { ROUTE, router };
