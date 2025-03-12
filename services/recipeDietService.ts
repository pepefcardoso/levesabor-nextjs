import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import { RecipeDiet } from "@/typings/recipe";
import apiClient from "./apiClient";

export const getRecipeDiets = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<RecipeDiet>> => {
  try {
    const response = await apiClient.get<PaginationResponse<RecipeDiet>>("/recipe-diets", {
      params: {
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Resposta inválida");
    }

    return response.data;
  } catch {
    throw new Error("Falha ao buscar dietas de receitas");
  }
};

export const getRecipeDiet = async (id: string): Promise<RecipeDiet> => {
  try {
    const response = await apiClient.get<RecipeDiet>(`/recipe-diets/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao buscar dieta de receita");
  }
};

export const createRecipeDiet = async (data: FormData): Promise<RecipeDiet> => {
  try {
    const response = await apiClient.post<RecipeDiet>("/recipe-diets", data);
    return response.data;
  } catch {
    throw new Error("Falha ao criar dieta de receita");
  }
};

export const updateRecipeDiet = async (id: string, data: FormData): Promise<RecipeDiet> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<RecipeDiet>(`/recipe-diets/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Falha ao atualizar dieta de receita");
  }
};

export const deleteRecipeDiet = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/recipe-diets/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao deletar dieta de receita");
  }
};
