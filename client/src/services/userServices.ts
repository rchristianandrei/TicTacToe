const HOST = `${import.meta.env.VITE_API_ENDPOINT}/user`;

export async function register(
  username: string,
  displayName: string,
  password: string
) {
  try {
    const response = await fetch(`${HOST}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        displayName: displayName,
        password: password,
      }),
    });

    const data = await response.json();

    // if not OK
    if (response.status < 200 || response.status >= 300) {
      throw Error(data.message);
    }
  } catch (e) {
    throw e;
  }
}
