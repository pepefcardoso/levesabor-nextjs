import useUserStore from "@/store/userStore";
import { userService } from ".";
import useAuthStore from "../store/authStore";
import apiClient from "./apiClient";

export const AuthService = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha no login");
      }

      useAuthStore.getState().setAuthenticated(true);
      await this.getCurrentUser();

      return true;
    } catch (error: unknown) {
      let errorMessage = "Please check your credentials and try again.";
      if (error instanceof Error) errorMessage = error.message;
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Falha ao comunicar com o servidor");
      }

      useAuthStore.getState().logout();
      useUserStore.getState().clearUser();

      return true;
    } catch (error) {
      console.error("Erro durante logout:", error);
      throw new Error("Não foi possível completar o logout. Tente novamente.");
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

  async getCurrentUser(): Promise<void> {
    try {
      const currentUser = await userService.getCurrent();

      useUserStore.getState().setUser(currentUser);
    } catch (error) {
      console.error("Erro ao buscar usuário atual:", error);
      throw new Error("Não foi possível buscar o usuário atual.");
    }
  },
};
