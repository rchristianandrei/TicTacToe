import { Game, GameInterface } from "../database/game";
import { User } from "../database/user";

export async function createGame(
  ownerId: string,
  challengerId: string,
  lobbyNumber: string
) {
  const game = new Game({
    gameNumber: lobbyNumber,
    owner: ownerId,
    challenger: challengerId,
    turn: Math.round(Math.random()) === 0 ? ownerId : challengerId,
    round: 1,
    matrix: Array.from({ length: 9 }),
  });

  await game.save();
}

export async function getGame(userId: string) {
  return await Game.findOne({
    $or: [{ owner: userId }, { challenger: userId }],
  });
}

export async function checkGame(gameNumber: string): Promise<boolean> {
  return (await Game.findOne({ gameNumber: gameNumber })) !== null;
}

export async function updateGame(gameInterface: GameInterface) {
  const game = new Game(gameInterface);

  game.turn =
    game.turn.toString() === game.owner.toString()
      ? game.challenger
      : game.owner;

  await game.save();
}

export async function deleteGame(gameNumber: string) {
  await Game.deleteOne({ gameNumber: gameNumber });
}

export default { createGame, getGame, checkGame, updateGame, deleteGame };
