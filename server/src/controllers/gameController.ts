import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";

import lobbyRepo from "../repo/lobbyRepo";
import gameRepo from "../repo/gameRepo";
import { users } from "../ws";
import userRepo from "../repo/userRepo";

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

    const challenger = users.get(lobby.challenger.toString());
    challenger?.send(JSON.stringify({ type: "game start" }));

    res.status(200).send({ message: "Successfully created the game" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Something went wrong, please try again later" });
    return;
  }
});

router.get("/:gameNumber", authGuard(), async (req, res) => {
  const userId = (req.user as any).id.toString();
  const gameNumber = req.params.gameNumber;

  if (!gameNumber) {
    res.status(400).send({ message: "Game Number is undefined" });
    return;
  }

  try {
    const game = await gameRepo.getGame(gameNumber);

    if (!game) {
      res.status(404).send({ message: "Game not found" });
      return;
    }

    if (
      game.owner.toString() !== userId &&
      game.challenger.toString() !== userId
    ) {
      res.sendStatus(401);
      return;
    }

    const enemy = await userRepo.findUserById(
      game.owner.toString() === userId
        ? game.challenger.toString()
        : game.owner.toString()
    );
    if (!enemy) {
      res.status(400).send({ message: "Enemy not found" });
      return;
    }

    res.status(200).send({
      enemyName: enemy.displayName,
      yourTurn: game.turn === userId,
      round: game.round,
      data: game.matrix,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Something went wrong please try again later" });
  }
});

export default { ROUTE, router };
