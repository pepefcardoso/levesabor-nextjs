import { NewsletterCustomer } from "@/typings/newsletter";
import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import apiClient from "./apiClient";

export const getNewsletterCustomers = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<NewsletterCustomer>> => {
  try {
    const response = await apiClient.get<PaginationResponse<NewsletterCustomer>>("/newsletter", {
      params: {
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Resposta inválida do servidor");
    }

    return response.data;
  } catch {
    throw new Error("Falha ao buscar os clientes da newsletter");
  }
};

export const getNewsletterCustomer = async (id: string): Promise<NewsletterCustomer> => {
  try {
    const response = await apiClient.get<NewsletterCustomer>(`/newsletter/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao buscar o cliente da newsletter");
  }
};

export const createNewsletterCustomer = async (data: FormData): Promise<NewsletterCustomer> => {
  try {
    const response = await apiClient.post<NewsletterCustomer>("/newsletter", data);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const updateNewsletterCustomer = async (id: string, data: FormData): Promise<NewsletterCustomer> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<NewsletterCustomer>(`/newsletter/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Falha ao atualizar o cliente da newsletter");
  }
};

export const deleteNewsletterCustomer = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/newsletter/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao deletar o cliente da newsletter");
  }
};
