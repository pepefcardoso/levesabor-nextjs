import {
  ApiResponse,
  PaginationParams,
  PaginationResponse,
  RecipeDiet,
} from "../typings/api";
import apiClient from "./apiClient";

export const getRecipeDiets = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<RecipeDiet>> => {
  try {
    const response = await apiClient.get<PaginationResponse<RecipeDiet>>(
      "/recipe-diets",
      {
        params: {
          page: pagination.page,
          per_page: pagination.perPage,
        },
      }
    );

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching recipe diets:", error);
    throw new Error("Failed to fetch recipe diets");
  }
};

export const getRecipeDiet = async (
  id: string
): Promise<ApiResponse<RecipeDiet>> => {
  try {
    const response = await apiClient.get<ApiResponse<RecipeDiet>>(
      `/recipe-diets/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe diet with ID ${id}:`, error);
    throw new Error("Failed to fetch recipe diet");
  }
};

export const createRecipeDiet = async (
  data: FormData
): Promise<ApiResponse<RecipeDiet>> => {
  try {
    const response = await apiClient.post<ApiResponse<RecipeDiet>>(
      "/recipe-diets",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating recipe diet:", error);
    throw new Error("Failed to create recipe diet");
  }
};

export const updateRecipeDiet = async (
  id: string,
  data: FormData
): Promise<ApiResponse<RecipeDiet>> => {
  try {
    const response = await apiClient.put<ApiResponse<RecipeDiet>>(
      `/recipe-diets/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating recipe diet with ID ${id}:`, error);
    throw new Error("Failed to update recipe diet");
  }
};

export const deleteRecipeDiet = async (
  id: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/recipe-diets/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting recipe diet with ID ${id}:`, error);
    throw new Error("Failed to delete recipe diet");
  }
};
