import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";

import lobbyRepo from "../repo/lobbyRepo";
import gameRepo from "../repo/gameRepo";
import { users } from "../ws";
import userRepo from "../repo/userRepo";
import { checkIfPlayerWon } from "../services/winningConditionService";

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

router.get("/", authGuard(), async (req, res) => {
  const userId = (req.user as any).id.toString();

  try {
    const game = await gameRepo.getGame(userId);

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

    const data = game.matrix.map((v) => {
      if (v) {
        return v.toString() === game.owner._id.toString() ? "X" : "O";
      } else {
        return null;
      }
    });

    res.status(200).send({
      enemyName: enemy.displayName,
      yourTurn: game.turn.toString() === userId,
      round: game.round,
      data: data,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Something went wrong please try again later" });
  }
});

router.patch("/", authGuard(), async (req, res) => {
  const userId = (req.user as any).id.toString();
  const index: number = req.body.index;

  if (index > 8 || index < 0) {
    res.status(400).send({ message: "Index out of range" });
    return;
  }

  try {
    const game = await gameRepo.getGame(userId);

    if (!game) {
      res.status(404).send({ message: "Game not found" });
      return;
    }

    // Is a player
    if (
      game.owner.toString() !== userId &&
      game.challenger.toString() !== userId
    ) {
      res.sendStatus(401);
      return;
    }

    // Current Turn
    if (game.turn.toString() !== userId) {
      res.status(400).send({ message: "Not yet your turn" });
      return;
    }

    // Assign new move
    game.matrix[index] = userId;

    const won = checkIfPlayerWon(
      userId,
      index,
      game.matrix.map((v) => (v ? v.toString() : ""))
    );

    console.log(won);

    await gameRepo.updateGame(game.id, userId, index);

    users
      .get(game.owner.toString())
      ?.send(JSON.stringify({ type: "game updated" }));
    users
      .get(game.challenger.toString())
      ?.send(JSON.stringify({ type: "game updated" }));

    res.status(200).send({ message: "Game updated" });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send({ message: "Something went wrong, please try again later" });
  }
});

export default { ROUTE, router };
