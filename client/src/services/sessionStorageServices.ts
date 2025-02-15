const KEY = "user";

export function setUser(obj: { displayName: string; token: string }) {
  const data = JSON.stringify(obj);
  sessionStorage.setItem(KEY, data);
}

export function getUser() {
  const data: { displayName: string; token: string } | null = JSON.parse(
    sessionStorage.getItem(KEY) || ""
  );
  return data;
}

export function removeUser() {
  sessionStorage.removeItem(KEY);
}
