import { User } from "../database/user";

export async function register(model: {
  username: string;
  displayName: string;
  password: string;
}) {
  const newUser = new User(model);
  newUser.username = newUser.username.toLowerCase();
  await newUser.save();
}

export async function checkUsername(username: string) {
  const existing = await User.findOne({ username: username.toLowerCase() });
  return existing != null;
}

export default { register, checkUsername };
