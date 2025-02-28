import { Schema } from "mongoose";
import { Lobby } from "../database/lobby";

export async function getLobbyByOwnerId(ownerId: string) {
  return await Lobby.findOne({ owner: ownerId });
}

export async function getLobbyByChallengerId(challengerId: string) {
  return await Lobby.findOne({ challenger: challengerId });
}

export async function getLobbyByRoomNumber(roomNumber: string) {
  return await Lobby.findOne({ roomNumber: roomNumber });
}

export async function createLobby(
  owner: Schema.Types.ObjectId,
  roomNumber: string
) {
  const lobby = new Lobby({ owner, roomNumber });
  await lobby.save();

  return lobby;
}

export async function joinLobby(
  challenger: Schema.Types.ObjectId,
  roomNumber: string
) {
  await Lobby.updateOne({ roomNumber: roomNumber }, { challenger: challenger });
}

export async function exitLobby(roomNumber: string, userId: string) {
  const lobby = await getLobbyByRoomNumber(roomNumber);

  if (!lobby) return;

  if (lobby.owner.toString() === userId) {
    await Lobby.deleteOne({ roomNumber: roomNumber });
  } else if (lobby.challenger && lobby.challenger.toString() === userId) {
    lobby.challenger = null;
    await Lobby.updateOne(lobby);
  }
}

export default {
  getLobbyByOwnerId,
  getLobbyByChallengerId,
  getLobbyByRoomNumber,
  createLobby,
  joinLobby,
  exitLobby,
};
