import {
  ApiResponse,
  PaginationParams,
  PaginationResponse,
  RecipeCategory,
} from "../typings/api";
import apiClient from "./apiClient";

export const getRecipeCategories = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<RecipeCategory>> => {
  try {
    const response = await apiClient.get<PaginationResponse<RecipeCategory>>(
      "/recipe-categories",
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
    console.error("Error fetching recipe categories:", error);
    throw new Error("Failed to fetch recipe categories");
  }
};

export const getRecipeCategory = async (
  id: string
): Promise<ApiResponse<RecipeCategory>> => {
  try {
    const response = await apiClient.get<ApiResponse<RecipeCategory>>(
      `/recipe-categories/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe category with ID ${id}:`, error);
    throw new Error("Failed to fetch recipe category");
  }
};

export const createRecipeCategory = async (
  data: FormData
): Promise<ApiResponse<RecipeCategory>> => {
  try {
    const response = await apiClient.post<ApiResponse<RecipeCategory>>(
      "/recipe-categories",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating recipe category:", error);
    throw new Error("Failed to create recipe category");
  }
};

export const updateRecipeCategory = async (
  id: string,
  data: FormData
): Promise<ApiResponse<RecipeCategory>> => {
  try {
    const response = await apiClient.put<ApiResponse<RecipeCategory>>(
      `/recipe-categories/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating recipe category with ID ${id}:`, error);
    throw new Error("Failed to update recipe category");
  }
};

export const deleteRecipeCategory = async (
  id: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/recipe-categories/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting recipe category with ID ${id}:`, error);
    throw new Error("Failed to delete recipe category");
  }
};
