import apiClient from './apiClient'; // Import the apiClient instance

type Recipe = {
  id: number;
  title: string;
  description: string;
  time: number;
  portion: number;
  difficulty: number;
  category: { name: string };
  diets: { name: string }[];
  image: { url: string };
};

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

// Updated getRecipes to use apiClient
export const getRecipes = async ({ filters, page, perPage }: { filters: Filters; page: number; perPage: number }): Promise<RecipePaginationResponse> => {
  const response = await apiClient.get('/recipes', {
    params: {
      title: filters.title,
      category_id: filters.category_id,
      diets: filters.diets.join(','), // Assuming filters.diets is an array of diet IDs
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
};

// Updated getRecipe to use apiClient
export const getRecipe = async (id: string) => {
  return apiClient.get(`/recipes/${id}`);
};

// Updated createRecipe to use apiClient
export const createRecipe = async (data: FormData) => {
  return apiClient.post('/recipes', data);
};
