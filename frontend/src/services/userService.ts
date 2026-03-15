export interface User {
  userId: number;
  name: string;
  email: string;
}


export async function loginUser(email: string, password: string): Promise<{ success: boolean; access_token: string }> {
  const response = await fetch("/auth/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Login inválido");
  const data = await response.json();
  if (!data.success || !data.data?.access_token) throw new Error("Token não recebido");
  return { success: true, access_token: data.data.access_token };
}


export async function createUser(email: string, password: string): Promise<{ success: boolean }> {
  const response = await fetch("/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Falha ao cadastrar usuário");
  const data = await response.json();
  if (!data.success) throw new Error(data.message || "Erro ao cadastrar");
  return { success: true };
}