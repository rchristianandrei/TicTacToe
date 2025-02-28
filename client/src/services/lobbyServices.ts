import { getUser } from "./sessionStorageServices";

const HOST = `${import.meta.env.VITE_API_ENDPOINT}/lobby`;

export async function createLobby(signal: AbortSignal) {
  try {
    const user = getUser();

    if (!user) return null;

    const response = await fetch(`${HOST}/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      signal: signal,
    });

    const data = await response.json();

    // if not OK
    if (response.status < 200 || response.status >= 300) {
      throw Error(data.message);
    }

    const returnData: { roomNumber: string; opponentName: string } = data;
    return returnData;
  } catch (e) {
    throw e;
  }
}

export async function joinLobby(roomNumber: string) {
  try {
    const user = getUser();

    if (!user) return null;

    const response = await fetch(`${HOST}/join`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ roomNumber: roomNumber }),
    });

    const data = await response.json();

    // if not OK
    if (response.status < 200 || response.status >= 300) {
      throw Error(data.message);
    }

    const returnData: { opponent: string; roomNumber: string } = data;
    return returnData;
  } catch (e) {
    throw e;
  }
}

export async function deleteLobby(roomNumber: string): Promise<boolean> {
  try {
    const user = getUser();

    if (!user) return false;

    const response = await fetch(`${HOST}/${roomNumber}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    // if not OK
    if (response.status < 200 || response.status >= 300) {
      throw Error((await response.json()).message);
    }
    return true;
  } catch (e) {
    throw e;
  }
}

export default { createLobby, joinLobby, deleteLobby };
