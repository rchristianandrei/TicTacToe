import { getUser } from "./sessionStorageServices";

const HOST = `${import.meta.env.VITE_API_ENDPOINT}/lobby`;

export async function createLobby() {
  try {
    const user = getUser();

    if (!user) return null;

    const response = await fetch(`${HOST}/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    // if not OK
    if (response.status < 200 || response.status >= 300) {
      throw Error(data.message);
    }

    const returnData: { roomNumber: string } = data;
    return returnData;
  } catch (e) {
    throw e;
  }
}

export default { createLobby };
