import apiClient from "./apiClient";
import StandardService from "./standardService";
import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import { Recipe, RecipeFilters } from "@/typings/recipe";

export class RecipeService extends StandardService<Recipe> {
  constructor() {
    super("/recipes");
  }

  async getCurrentUserRecipes(
    pagination: PaginationParams,
    filters?: RecipeFilters
  ): Promise<PaginationResponse<Recipe>> {
    try {
      const response = await apiClient.get<PaginationResponse<Recipe>>("/recipes/my", {
        params: {
          ...filters,
          page: pagination.page,
          per_page: pagination.per_page,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Falha ao buscar receitas" + error);
    }
  }

  async getCurrentUserFavoriteRecipes(
    pagination: PaginationParams,
    filters?: RecipeFilters
  ): Promise<PaginationResponse<Recipe>> {
    try {
      const response = await apiClient.get<PaginationResponse<Recipe>>("/recipes/favorites", {
        params: {
          ...filters,
          page: pagination.page,
          per_page: pagination.per_page,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Falha ao buscar receitas" + error);
    }
  }

  async toggleFavoriteRecipe(recipeId: string): Promise<boolean> {
    try {
      const response = await apiClient.post("/users/favorite-recipe", {
        recipe_id: recipeId,
      });

      if (response.status !== 200) {
        throw new Error("Erro ao alternar favorito");
      }

      return true;
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
      return false;
    }
  }
}
