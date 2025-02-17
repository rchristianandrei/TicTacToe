import { WebSocketServer, WebSocket } from "ws";

export const users = new Map<string, WebSocket>();
const lobbies = new Map<string, { roomNumber: string }>();

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("connected");

  ws.on("message", (rawData) => {
    const data = JSON.parse(rawData.toString());

    if (!data.type) return;

    switch (data.type) {
      case "register":
        users.set(data.id, ws);

        ws.on("close", () => {
          users.delete(data.id);
          console.log("disconnected");
        });

        break;

      case "createLobby":
        const existing = lobbies.get(data.id);

        const roomObj = existing
          ? existing
          : {
              roomNumber: Math.floor(
                Math.random() * 900000 + 100000
              ).toString(),
            };

        if (!existing) lobbies.set(data.id, roomObj);

        ws.send(
          JSON.stringify({
            type: "createdLobby",
            roomNumber: roomObj.roomNumber,
          })
        );

        console.log(roomObj);
        break;
    }
  });
});
