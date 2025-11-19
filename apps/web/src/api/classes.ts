import client from "./client";

export const getClasses = async () => {
  const res = await client.get("/classes");
  return res.data;
};
