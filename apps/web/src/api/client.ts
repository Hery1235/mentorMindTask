import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000", // replace with your backend URL
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
