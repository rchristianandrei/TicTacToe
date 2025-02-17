const KEY = "user";

export function setUser(obj: { displayName: string; token: string }) {
  const data = JSON.stringify(obj);
  sessionStorage.setItem(KEY, data);
}

export function getUser() {
  const raw = sessionStorage.getItem(KEY);

  if (!raw) return null;

  const data: { displayName: string; token: string } = JSON.parse(raw);
  return data;
}

export function removeUser() {
  sessionStorage.removeItem(KEY);
}
