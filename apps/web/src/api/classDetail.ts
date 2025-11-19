import client from "./client";

export const getRoster = async (classId: string) => {
  const res = await client.get(`/classes/${classId}/roster`);
  return res.data;
};

export const getMetrics = async (classId: string) => {
  const res = await client.get(`/classes/${classId}/metrics`);
  return res.data;
};

export const createAssignment = async (payload: any) => {
  const res = await client.post("/assignments", payload);
  return res.data;
};
