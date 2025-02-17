import { User } from "../database/user";
import { hash } from "../services/hashService";

export async function register(model: {
  username: string;
  displayName: string;
  password: string;
}) {
  const newUser = new User({
    username: model.username.toLowerCase(),
    displayName: model.displayName,
    password: await hash(model.password),
  });
  await newUser.save();
}

export async function checkUsername(username: string) {
  const existing = await User.findOne({ username: username.toLowerCase() });
  return existing != null;
}

export async function findUserById(id: string) {
  return await User.findById(id);
}

export async function findUserByUsername(username: string) {
  return await User.findOne({ username: username.toLowerCase() });
}

export default { register, checkUsername, findUserById, findUserByUsername };
