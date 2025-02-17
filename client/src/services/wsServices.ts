let ws: WebSocket | null = null;
let delegates: ((data: any) => any)[] = [];
let pendingSentMessages: string[] = [];

export function connectToWSS() {
  if (ws) return false;

  ws = new WebSocket(import.meta.env.VITE_WS_ENDPOINT);

  ws.addEventListener("open", () => {
    ws?.send(JSON.stringify({ type: "register", id: "123456" }));

    pendingSentMessages.forEach((data) => {
      ws?.send(data);
    });
    pendingSentMessages = [];
  });

  ws.addEventListener("message", (e) => {
    delegates.forEach((v) => {
      v(JSON.parse(e.data));
    });
  });

  return true;
}

export function subscribeToMessages(onMessage: (data: any) => any) {
  delegates.push(onMessage);
  return ws != null;
}

export function unsubscribeToMessages(onMessage: (data: any) => any) {
  delegates = delegates.filter((v) => v !== onMessage);
  return ws != null;
}

export function closeWS() {
  ws?.close();
  ws = null;
}

export function sendMessage(obj: any) {
  const data = JSON.stringify(obj);
  if (ws) {
    ws.send(data);
  } else {
    pendingSentMessages.push(data);
  }
}

export default {
  connectToWSS,
  subscribeToMessages,
  unsubscribeToMessages,
  closeWS,
};
