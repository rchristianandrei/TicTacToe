import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const users = new Map<string, WebSocket>();

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws, req) => {
  const token = req.url?.split("token=")[1];

  if (!token) {
    ws.close();
    return;
  }

  const temp: any = jwt.verify(token, process.env.SERVERKEY ?? "");
  const id = temp.id;

  if (users.get(id)) {
    ws.close();
    return;
  }

  users.set(id, ws);

  ws.on("close", () => {
    users.delete(id);
  });
});
