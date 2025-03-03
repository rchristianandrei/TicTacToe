import { Game } from "../database/game";

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
    matrix: Array.from({ length: 3 }, () => Array(3).fill(null)),
  });

  await game.save();
}

export async function getGame(gameNumber: string) {
  return await Game.findOne({ gameNumber: gameNumber });
}

export async function checkGame(gameNumber: string): Promise<boolean> {
  return (await getGame(gameNumber)) !== null;
}

export default { createGame, getGame, checkGame };
