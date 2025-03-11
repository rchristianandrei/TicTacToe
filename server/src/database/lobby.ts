import mongoose, { Schema } from "mongoose";

export interface LobbyInterface {
  roomNumber: string;
  owner: Schema.Types.ObjectId;
  challenger: Schema.Types.ObjectId | null;
}

const LobbiesSchema = new mongoose.Schema<LobbyInterface>({
  roomNumber: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, required: true },
  challenger: { type: Schema.Types.ObjectId },
});

const modelName = "lobby";
export const Lobby = mongoose.model(modelName, LobbiesSchema);

export default { modelName, Lobby };
