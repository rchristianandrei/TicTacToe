let ws: WebSocket | null = null;

export function connectToWSS() {
  if (ws) return false;

  ws = new WebSocket(import.meta.env.VITE_WS_ENDPOINT);

  ws.addEventListener("open", () => {
    ws?.send(JSON.stringify({ type: "register", id: "123456" }));
  });

  return true;
}

export function subscribeToMessages(onMessage: (e: MessageEvent) => any) {
  ws?.addEventListener("message", onMessage);

  return ws != null;
}

export function unsubscribeToMessages(onMessage: (e: MessageEvent) => any) {
  ws?.removeEventListener("message", onMessage);

  return ws != null;
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
