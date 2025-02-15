import { setUser } from "./sessionStorageServices";

const HOST = `${import.meta.env.VITE_API_ENDPOINT}/auth`;
console.log(HOST);

export async function login(username: string, password: string) {
  try {
    const response = await fetch(`${HOST}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    // if not OK
    if (response.status < 200 || response.status >= 300) {
      throw Error(data.message);
    }

    setUser(data);
  } catch (e) {
    throw e;
  }
}
