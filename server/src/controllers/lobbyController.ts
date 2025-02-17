import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import lobbyRepo from "../repo/lobbyRepo";
import userRepo from "../repo/userRepo";

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

    res.status(200).send({ roomNumber: lobby.roomNumber });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to create / retrieve lobby" });
  }
});

router.put("/join", authGuard(), async (req, res) => {
  const user: any = req.user;
  const roomNumber = req.body.roomNumber;

  try {
    const lobby = await lobbyRepo.getLobbyByRoomNumber(roomNumber);

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

    res.status(200).send({ opponent: opponent?.displayName });
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
    await lobbyRepo.deleteLobby(roomNumber);
    res.status(204).send({ message: "Successfully deleted the lobby" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to delete the lobby" });
  }
});

export default { ROUTE, router };
