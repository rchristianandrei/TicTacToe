import mongoose, { Schema } from "mongoose";

const LobbiesSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, required: true },
  challenger: { type: Schema.Types.ObjectId },
});

const modelName = "lobby";
export const Lobby = mongoose.model(modelName, LobbiesSchema);

export default { modelName, Lobby };
