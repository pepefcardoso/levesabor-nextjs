import axios from "axios";
import useAuthStore from "../store/authStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (!(config.data instanceof FormData) && !config.headers?.["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isLoginRequest = originalRequest?.url?.includes("/login");

    if (isUnauthorized && !isLoginRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("authToken");
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    return Promise.reject({
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default apiClient;
