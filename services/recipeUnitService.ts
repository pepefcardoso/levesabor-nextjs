import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import { RecipeUnit } from "@/typings/recipe";
import apiClient from "./apiClient";


export const getRecipeUnits = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<RecipeUnit>> => {
  try {
    const response = await apiClient.get<PaginationResponse<RecipeUnit>>("/recipe-units", {
      params: {
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch {
    throw new Error("Falha ao buscar unidades de receita");
  }
};

export const getRecipeUnit = async (id: string): Promise<RecipeUnit> => {
  try {
    const response = await apiClient.get<RecipeUnit>(`/recipe-units/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao buscar unidade de receita");
  }
};

export const createRecipeUnit = async (data: FormData): Promise<RecipeUnit> => {
  try {
    const response = await apiClient.post<RecipeUnit>("/recipe-units", data);
    return response.data;
  } catch {
    throw new Error("Falha ao criar unidade de receita");
  }
};

export const updateRecipeUnit = async (id: string, data: FormData): Promise<RecipeUnit> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<RecipeUnit>(`/recipe-units/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Falha ao atualizar unidade de receita");
  }
};

export const deleteRecipeUnit = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/recipe-units/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao deletar unidade de receita");
  }
};
