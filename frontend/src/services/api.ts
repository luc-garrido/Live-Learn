const API_URL = "http://127.0.0.1:8000";

export async function apiGet(route: string, token?: string) {
  const res = await fetch(`${API_URL}${route}`, {
    credentials: "include",
    headers: {
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    }
  });
  return res.json();
}

export async function apiPost(route: string, body: any, token?: string) {
  const res = await fetch(`${API_URL}${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return res.json();
}