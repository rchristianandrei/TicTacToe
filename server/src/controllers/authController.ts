import { Router } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userRepo from "../repo/userRepo";
import hashService from "../services/hashService";

export const ROUTE = "/api/auth";
export const router = Router();

dotenv.config();
const SERVERKEY = process.env.SERVERKEY || "";

router.post("/login", async (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  if (!username) {
    res.status(400).send({ message: "username can't be blank" });
    return;
  }

  if (!password) {
    res.status(400).send({ message: "password can't be blank" });
    return;
  }

  try {
    const user = await userRepo.findUserByUsername(username);

    if (!user) {
      res.status(404).send({ message: "user is not available" });
      return;
    }

    const match = await hashService.compare(password, user.password);

    if (!match) {
      res.status(404).send({ message: "user is not available" });
      return;
    }

    const returnData = {
      displayName: user.displayName,
      token: jwt.sign({ id: user.id }, SERVERKEY, { expiresIn: "1h" }),
    };

    res.status(200).send(returnData);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default { ROUTE, router };
