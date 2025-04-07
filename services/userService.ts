import { User } from "../typings/user";
import apiClient from "./apiClient";

export class UserService {
  async getCurrent(): Promise<User> {
    try {
      const response = await apiClient.get<User>("/user/me");
      return response.data;
    } catch {
      throw new Error("Falha ao buscar usuário. Tente novamente");
    }
  }

  async create(data: FormData): Promise<User> {
    try {
      const response = await apiClient.post<User>("/users", data);
      return response.data;
    } catch {
      throw new Error("Falha ao criar usuário. Tente novamente");
    }
  }

  async update(id: string, data: FormData): Promise<User> {
    try {
      data.append("_method", "PUT");
      const response = await apiClient.post<User>(`/users/${id}`, data);
      return response.data;
    } catch {
      throw new Error("Falha ao atualizar usuário. Tente novamente");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await apiClient.delete<void>(`/users/${id}`);
      return response.data;
    } catch {
      throw new Error("Falha ao deletar usuário. Tente novamente");
    }
  }
}
