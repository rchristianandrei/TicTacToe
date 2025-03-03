import { model, Schema } from "mongoose";

const GameScheme = new Schema({
  gameNumber: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, required: true },
  challenger: { type: Schema.Types.ObjectId, required: true },
  turn: { type: Schema.Types.ObjectId, required: true },
  round: { type: Number, required: true },
  matrix: { type: [Schema.Types.ObjectId], required: true },
});

export const modelName = "game";
export const Game = model(modelName, GameScheme);

export default { modelName, Game };
