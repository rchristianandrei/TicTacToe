let ws: WebSocket | null = null;
let delegates: ((data: any) => any)[] = [];

export function connectToWSS(token: string) {
  if (ws) return false;

  ws = new WebSocket(`${import.meta.env.VITE_WS_ENDPOINT}?token=${token}`);

  ws.addEventListener("message", (e) => {
    delegates.forEach((v) => {
      v(JSON.parse(e.data));
    });
  });

  return true;
}

export function subscribeToMessages(onMessage: (data: any) => any) {
  delegates.push(onMessage);
}

export function unsubscribeToMessages(onMessage: (data: any) => any) {
  delegates = delegates.filter((v) => v !== onMessage);
}

export function closeWS() {
  ws?.close();
  ws = null;
}

export default {
  connectToWSS,
  subscribeToMessages,
  unsubscribeToMessages,
  closeWS,
};
