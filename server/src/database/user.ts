import mongoose from "mongoose";

export interface UserInterface {
  username: string;
  displayName: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserInterface>({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
});

export const modelName = "user";
export const User = mongoose.model(modelName, userSchema);

export default { modelName, User };
