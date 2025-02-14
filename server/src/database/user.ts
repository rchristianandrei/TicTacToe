import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
});

export const modelName = "user";
export const User = mongoose.model(modelName, userSchema);

export default { modelName, User };
