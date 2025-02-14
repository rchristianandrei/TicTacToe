import bcrypt from "bcryptjs";

const SALT = 10;

export async function hash(password: string) {
  return await bcrypt.hash(password, SALT);
}

export async function compare(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export default { hash, compare };
