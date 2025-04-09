import { Rating } from "@/typings/rating";
import apiClient from "./apiClient";

export class RatingsService {
  async create(data: FormData): Promise<void> {
    try {
      await apiClient.post<Rating>("/ratings", data);
    } catch (error) {
      throw new Error("Falha ao registrar avaliação. Tente novamente" + error);
    }
  }

  async update(id: string, data: FormData): Promise<void> {
    try {
      data.append("_method", "PUT");
      await apiClient.post<Rating>(`/ratings/${id}`, data);
    } catch {
      throw new Error("Falha ao atualizar avaliação. Tente novamente");
    }
  }
}
