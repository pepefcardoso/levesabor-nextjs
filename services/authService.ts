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
      localStorage.removeItem("authToken");
      delete apiClient.defaults.headers.common["Authorization"];

      let errorMessage = "Por favor, confira suas credenciais e tente novamente.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null && "response" in error) {
        const errorResponse = error as {
          response: { data?: { errors?: string[]; message?: string } };
        };
        errorMessage =
          errorResponse.response.data?.errors?.join(", ") || errorResponse.response.data?.message || errorMessage;
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
    } catch {
      throw new Error("O logout falhou. Por favor, tente novamente.");
    }
  },

  async forgotPassword(email: string): Promise<boolean> {
    try {
      await apiClient.post("/password/forgot", { email });
      return true;
    } catch {
      throw new Error("Falha ao enviar e-mail de recuperação de senha. Por favor, tente novamente.");
    }
  },

  async resetPassword(token: string, email: string, password: string, passwordConfirmation: string): Promise<boolean> {
    try {
      await apiClient.post("/password/reset", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      return true;
    } catch {
      throw new Error("Falha ao redefinir a senha. Por favor, tente novamente.");
    }
  },
};
