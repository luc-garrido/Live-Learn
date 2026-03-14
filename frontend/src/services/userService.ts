export interface User {
  userId: number;
  name: string;
  email: string;
}

export function loginUser(email: string, password: string): Promise<{ success: boolean; user: User }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      success: true,
      user: { userId: 1, name: "Isaque", email }
    }), 500);
  });
}

export function createUser(name: string, email: string, password: string): Promise<{ success: boolean; user: User }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      success: true,
      user: { userId: Math.floor(Math.random() * 1000), name, email }
    }), 500);
  });
}