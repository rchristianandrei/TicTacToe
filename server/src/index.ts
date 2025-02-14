import express from "express";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";

import userController from "./controllers/userContoller";
import "./auth/jwt-strategy";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(userController.ROUTE, userController.router);

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
