// services/authService.ts
import useAuthStore from "../store/authStore";
import apiClient from "./apiClient";
import { getCurrentUser } from "./userService";

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await apiClient.post("/login", { email, password });
      
      // Handle token from response
      const token = response.data?.token || response.data;
      if (!token) throw new Error("No authentication token received");

      // Store token immediately
      localStorage.setItem("authToken", token);
      
      // Set auth header for subsequent requests
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Get user details using UsersService
      const user = await getCurrentUser();
      
      // Update auth store
      useAuthStore.getState().login(token, user);
      return true;

    } catch (error: any) {
      console.error("Login error:", error);
      
      // Clear invalid token on error
      localStorage.removeItem("authToken");
      delete apiClient.defaults.headers.common["Authorization"];

      // Extract error message
      const errorData = error.response?.data || {};
      const errorMessage = 
        errorData.errors?.join(", ") ||
        errorData.message ||
        error.message ||
        "Login failed. Please check your credentials.";

      throw new Error(errorMessage);
    }
  },

  async logout() {
    try {
      await apiClient.post("/logout");
      localStorage.removeItem("authToken");
      delete apiClient.defaults.headers.common["Authorization"];
      useAuthStore.getState().logout();
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Logout failed. Please try again.");
    }
  },
};