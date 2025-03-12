import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import { Recipe, RecipeFilters } from "@/typings/recipe";
import apiClient from "./apiClient";

export const getRecipes = async ({
  filters,
  pagination,
}: {
  filters?: RecipeFilters;
  pagination: PaginationParams;
}): Promise<PaginationResponse<Recipe>> => {
  try {
    const response = await apiClient.get<PaginationResponse<Recipe>>("/recipes", {
      params: {
        ...filters,
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Resposta inválida");
    }

    return response.data;
  } catch {
    throw new Error("Falha ao buscar receitas");
  }
};

export const getRecipe = async (id: string): Promise<Recipe> => {
  try {
    const response = await apiClient.get<Recipe>(`/recipes/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao buscar receita");
  }
};

export const createRecipe = async (data: FormData): Promise<Recipe> => {
  try {
    const response = await apiClient.post<Recipe>("/recipes", data);
    return response.data;
  } catch {
    throw new Error("Falha ao criar receita");
  }
};

export const updateRecipe = async (id: string, data: FormData): Promise<Recipe> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<Recipe>(`/recipes/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Falha ao atualizar receita");
  }
};

export const deleteRecipe = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/recipes/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao deletar receita");
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
    const response = await apiClient.get<PaginationResponse<Recipe>>("/recipes/my", {
      params: {
        ...filters,
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Resposta inválida");
    }

    return response.data;
  } catch {
    throw new Error("Falha ao buscar minhas receitas");
  }
};
