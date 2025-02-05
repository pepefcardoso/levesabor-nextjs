import useAuthStore from "../store/authStore";
import apiClient from "./apiClient";

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await apiClient.post("/login", { email, password });
      const token = response.data; // Assuming the backend returns only the token

      localStorage.setItem("authToken", token);

      const userResponse = await apiClient.get("/user");
      const user = userResponse.data;

      useAuthStore.getState().login(token, user);

      return true;
    } catch (error: any) {
      console.error("Login error:", error);

      const errorMessage =
        error.response?.data?.errors ||
        "Login failed. Please check your credentials.";
      throw new Error(errorMessage);
    }
  },

  async logout() {
    try {
      await apiClient.post("/logout");

      // Remove token from localStorage
      localStorage.removeItem("authToken");

      // Update auth store
      useAuthStore.getState().logout();

      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Logout failed. Please try again.");
    }
  },
};
