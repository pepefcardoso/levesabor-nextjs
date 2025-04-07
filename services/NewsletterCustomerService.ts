import { NewsletterCustomer } from "@/typings/newsletter";
import apiClient from "./apiClient";

export class NewsletterCustomerService {
  async createNewsletterCustomer(data: FormData): Promise<NewsletterCustomer> {
    try {
      const response = await apiClient.post<NewsletterCustomer>("/newsletter", data);
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  async deleteNewsletterCustomer(id: string): Promise<void> {
    try {
      const response = await apiClient.delete<void>(`/newsletter/${id}`);
      return response.data;
    } catch {
      throw new Error("Falha ao deletar o cliente da newsletter");
    }
  }
}
