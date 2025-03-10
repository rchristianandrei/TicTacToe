import { model, Schema } from "mongoose";

export interface GameInterface {
  gameNumber: string;
  owner: Schema.Types.ObjectId;
  challenger: Schema.Types.ObjectId;
  turn: Schema.Types.ObjectId;
  round: Number;
  matrix: Schema.Types.ObjectId[];
  winner: Schema.Types.ObjectId | null;
  winningCombo: string[] | null;
}

const GameScheme = new Schema<GameInterface>({
  gameNumber: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, required: true },
  challenger: { type: Schema.Types.ObjectId, required: true },
  turn: { type: Schema.Types.ObjectId, required: true },
  round: { type: Number, required: true },
  matrix: { type: [Schema.Types.ObjectId], required: true },
  winner: { type: Schema.Types.ObjectId },
  winningCombo: { type: [String] },
});

export const modelName = "game";
export const Game = model(modelName, GameScheme);

export default { modelName, Game };
