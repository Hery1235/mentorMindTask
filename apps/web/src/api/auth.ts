import client from "./client";

export const login = async (email: string) => {
  const response = await client.post("/auth/login", { email });
  localStorage.setItem("token", response.data.token); // save token
  return response.data;
};
