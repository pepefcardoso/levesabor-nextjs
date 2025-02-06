import { Recipe } from '../typings/api';
import apiClient from './apiClient';

interface RecipePaginationResponse {
  data: Recipe[];
  current_page: number;
  last_page: number;
}

interface Filters {
  title: string;
  category_id: string;
  diets: string[];
}

export const getRecipes = async ({ filters, page, perPage }: { filters?: Filters; page: number; perPage: number }): Promise<RecipePaginationResponse> => {
  const response = await apiClient.get('/recipes', {
    params: {
      title: filters?.title,
      category_id: filters?.category_id,
      diets: filters?.diets.join(','),
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
};

export const getRecipe = async (id: string) => {
  return apiClient.get(`/recipes/${id}`);
};

export const createRecipe = async (data: FormData) => {
  return apiClient.post('/recipes', data);
};
