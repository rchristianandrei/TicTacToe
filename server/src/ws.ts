import { WebSocketServer, WebSocket } from "ws";

export const users = new Map<string, WebSocket>();

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  ws.on("message", (rawData) => {
    const data = JSON.parse(rawData.toString());

    switch (data.type) {
      case "register":
        users.set(data.id, ws);
        ws.on("close", () => {
          users.delete(data.id);
        });
        users.forEach((v) =>
          v.send(JSON.stringify({ type: "announcement", message: "what's up" }))
        );
        break;
    }
  });
});
