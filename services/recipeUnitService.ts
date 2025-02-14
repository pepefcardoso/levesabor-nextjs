import {
  PaginationParams,
  PaginationResponse,
  RecipeUnit,
} from "../typings/api";
import apiClient from "./apiClient";

export const getRecipeUnits = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<RecipeUnit>> => {
  try {
    const response = await apiClient.get<PaginationResponse<RecipeUnit>>(
      "/recipe-units",
      {
        params: {
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
    console.error("Error fetching recipe units:", error);
    throw new Error("Failed to fetch recipe units");
  }
};

export const getRecipeUnit = async (
  id: string
): Promise<RecipeUnit> => {
  try {
    const response = await apiClient.get<RecipeUnit>(
      `/recipe-units/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe unit with ID ${id}:`, error);
    throw new Error("Failed to fetch recipe unit");
  }
};

export const createRecipeUnit = async (
  data: FormData
): Promise<RecipeUnit> => {
  try {
    const response = await apiClient.post<RecipeUnit>(
      "/recipe-units",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating recipe unit:", error);
    throw new Error("Failed to create recipe unit");
  }
};

export const updateRecipeUnit = async (
  id: string,
  data: FormData
): Promise<RecipeUnit> => {
  try {
    const response = await apiClient.put<RecipeUnit>(
      `/recipe-units/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating recipe unit with ID ${id}:`, error);
    throw new Error("Failed to update recipe unit");
  }
};

export const deleteRecipeUnit = async (
  id: string
): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(
      `/recipe-units/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting recipe unit with ID ${id}:`, error);
    throw new Error("Failed to delete recipe unit");
  }
};
