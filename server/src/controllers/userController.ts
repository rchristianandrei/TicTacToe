import { Router } from "express";
import userRepo from "../repo/userRepo";

export const ROUTE = "/api/user";
export const router = Router();

router.post("/register", async (req, res) => {
  const username: string = req.body.username;
  const displayName: string = req.body.displayName;
  const password: string = req.body.password;

  try {
    if (!username) {
      res.status(400).send({ message: "Username can't be blank" });
      return;
    }

    const existing = await userRepo.checkUsername(username);
    if (existing) {
      res.status(400).send({ message: "Username is not available" });
      return;
    }

    if (!displayName) {
      res.status(400).send({ message: "Display name can't be blank" });
      return;
    }

    if (!password) {
      res.status(400).send({ message: "Password can't be blank" });
      return;
    }

    await userRepo.register({
      username: username,
      displayName: displayName,
      password: password,
    });

    res.status(200).send({ message: "Succcessfully registered user" });
  } catch (e: any) {
    res.sendStatus(500);
  }
});

export default { ROUTE, router };
