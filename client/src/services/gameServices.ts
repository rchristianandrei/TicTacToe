import { getUser } from "./sessionStorageServices";

const HOST = `${import.meta.env.VITE_API_ENDPOINT}/game`;

export async function start(lobbyNumber: string) {
  try {
    const user = getUser();

    if (!user) return null;

    const response = await fetch(`${HOST}/start`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ lobbyNumber: lobbyNumber }),
    });

    const data = await response.json();
    console.log(data);

    // if not OK
    if (response.status < 200 || response.status >= 300) {
      throw Error(data.message);
    }

    const returnData: { message: string } = data;
    return returnData;
  } catch (e) {
    throw e;
  }
}

export async function getData(signal: AbortSignal) {
  try {
    const user = getUser();

    if (!user) return null;

    const response = await fetch(`${HOST}`, {
      method: "get",
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

    const returnData: any = data;
    return returnData;
  } catch (e) {
    throw e;
  }
}

export default { start, getData };
