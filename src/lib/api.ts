import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

const api = axios.create({
  //baseURL: Constants.expoConfig?.extra?.apiUrl,
  baseURL: "http://172.30.1.80:3000",
});

api.interceptors.request.use((config) => {
  const token = "";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5분
    },
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response.data.message || error.message;
    console.log(message);

    return Promise.reject(error);
  }
);

export default api;
