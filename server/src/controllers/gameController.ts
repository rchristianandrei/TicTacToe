import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";

import lobbyRepo from "../repo/lobbyRepo";
import gameRepo from "../repo/gameRepo";

export const ROUTE = "/api/game";
export const router = Router();

router.post("/start", authGuard(), async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const lobbyNumber = req.body.lobbyNumber.toString();
  const userId: string = (req.user as any).id.toString();

  if (!lobbyNumber) {
    res.status(400).send({ message: "Lobby Number is undefined" });
    return;
  }

  try {
    // Get Lobby data
    const lobby = await lobbyRepo.getLobbyByRoomNumber(lobbyNumber);

    if (!lobby) {
      res.status(404).send({ message: "Lobby not found" });
      return;
    }
    if (lobby.owner.toString() !== userId) {
      res.sendStatus(401);
      return;
    }
    if (!lobby.challenger) {
      res.status(400).send({ message: "Can't start without a challenger" });
      return;
    }

    // Check if game already exists
    if (await gameRepo.checkGame(lobbyNumber)) {
      res.status(400).send({ message: "Game already exists" });
      return;
    }

    await gameRepo.createGame(
      lobby.owner.toString(),
      lobby.challenger.toString(),
      lobby.roomNumber
    );

    res.status(200).send({ message: "Successfully created the game" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Something went wrong, please try again later" });
    return;
  }
});

export default { ROUTE, router };
