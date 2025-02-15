import express from "express";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import dotnet from "dotenv";

import { authGuard } from "./middlewares/authGuard";
import { User } from "./database/user";

import routes from "./routes";

import "./auth/jwt-strategy";

dotnet.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(routes);

app.get("/", authGuard(), (req, res) => {
  const userObj = new User(req.user);
  console.log(userObj);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

mongoose
  .connect("mongodb://localhost/tictactoe")
  .then(() => {
    console.log("Successfully connected to mongodb");
  })
  .catch((reason) => {
    console.log(reason);
  });
