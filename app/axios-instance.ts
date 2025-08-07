// app\axios-instance.ts

import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof Error) return Promise.reject(error);
    return Promise.reject(
      new Error(typeof error === "string" ? error : JSON.stringify(error)),
    );
  },
);

export default api;
