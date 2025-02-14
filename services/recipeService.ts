import {
  PaginationParams,
  PaginationResponse,
  Recipe,
  RecipeFilters,
} from "../typings/api";
import apiClient from "./apiClient";

export const getRecipes = async ({
  filters,
  pagination,
}: {
  filters?: RecipeFilters;
  pagination: PaginationParams;
}): Promise<PaginationResponse<Recipe>> => {
  try {
    const response = await apiClient.get<PaginationResponse<Recipe>>(
      "/recipes",
      {
        params: {
          ...filters,
          page: pagination.page,
          per_page: pagination.per_page,
        },
      }
    );

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes");
  }
};

export const getRecipe = async (id: string): Promise<Recipe> => {
  try {
    const response = await apiClient.get<Recipe>(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    throw new Error("Failed to fetch recipe");
  }
};

export const createRecipe = async (data: FormData): Promise<Recipe> => {
  try {
    const response = await apiClient.post<Recipe>("/recipes", data);
    return response.data;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw new Error("Failed to create recipe");
  }
};

export const updateRecipe = async (
  id: string,
  data: FormData
): Promise<Recipe> => {
  try {
    const response = await apiClient.put<Recipe>(`/recipes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw new Error("Failed to update recipe");
  }
};

export const deleteRecipe = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting recipe with ID ${id}:`, error);
    throw new Error("Failed to delete recipe");
  }
};

export const getMyRecipes = async ({
  filters,
  pagination,
}: {
  filters?: RecipeFilters;
  pagination: PaginationParams;
}): Promise<PaginationResponse<Recipe>> => {
  try {
    const response = await apiClient.get<PaginationResponse<Recipe>>(
      "/recipes/my",
      {
        params: {
          ...filters,
          page: pagination.page,
          per_page: pagination.per_page,
        },
      }
    );

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    throw new Error("Failed to fetch my recipes");
  }
};
