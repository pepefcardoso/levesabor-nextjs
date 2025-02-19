import useAuthStore from "../store/authStore";
import apiClient from "./apiClient";
import { getCurrentUser } from "./userService";

export const AuthService = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await apiClient.post<{ token: string }>("/login", {
        email,
        password,
      });
      const token = response.data.token;
      if (!token) throw new Error("No authentication token received");

      localStorage.setItem("authToken", token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const user = await getCurrentUser();
      useAuthStore.getState().login(token, user);
      return true;
    } catch (error: unknown) {
      console.error("Login error:", error);

      localStorage.removeItem("authToken");
      delete apiClient.defaults.headers.common["Authorization"];

      let errorMessage = "Login failed. Please check your credentials.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const errorResponse = error as {
          response: { data?: { errors?: string[]; message?: string } };
        };
        errorMessage =
          errorResponse.response.data?.errors?.join(", ") ||
          errorResponse.response.data?.message ||
          errorMessage;
      }
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<boolean> {
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

  async resetPassword(email: string): Promise<boolean> {
    try {
      await apiClient.post("/reset-password", { email });
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      throw new Error(
        "Failed to send reset password request. Please try again."
      );
    }
  },
};
