
import { NewsletterCustomer } from "../typings/newsletter";
import { PaginationParams, PaginationResponse } from "../typings/pagination";
import apiClient from "./apiClient";

export const getNewsletterCustomers = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<NewsletterCustomer>> => {
  try {
    const response = await apiClient.get<
      PaginationResponse<NewsletterCustomer>
    >("/newsletter", {
      params: {
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching NewsletterCustomers:", error);
    throw new Error("Failed to fetch NewsletterCustomers");
  }
};

export const getNewsletterCustomer = async (
  id: string
): Promise<NewsletterCustomer> => {
  try {
    const response = await apiClient.get<NewsletterCustomer>(
      `/newsletter/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching NewsletterCustomer with ID ${id}:`, error);
    throw new Error("Failed to fetch NewsletterCustomer");
  }
};

export const createNewsletterCustomer = async (
  data: FormData
): Promise<NewsletterCustomer> => {
  try {
    const response = await apiClient.post<NewsletterCustomer>(
      "/newsletter",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating NewsletterCustomer:", error);

    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const updateNewsletterCustomer = async (
  id: string,
  data: FormData
): Promise<NewsletterCustomer> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<NewsletterCustomer>(
      `/newsletter/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating NewsletterCustomer with ID ${id}:`, error);
    throw new Error("Failed to update NewsletterCustomer");
  }
};

export const deleteNewsletterCustomer = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/newsletter/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting NewsletterCustomer with ID ${id}:`, error);
    throw new Error("Failed to delete NewsletterCustomer");
  }
};
