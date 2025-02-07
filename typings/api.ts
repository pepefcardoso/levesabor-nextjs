export enum RolesEnum {
  ADMIN = "admin",
  INTERNAL = "internal",
  USER = "user",
}

export interface Image {
  id: string;
  name: string;
  path: string;
  url: string;
  user_id: string;
  imageable_id: string;
  imageable_type: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  birthday: string;
  phone: string;
  role: RolesEnum;
  image?: Image;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  category_id: string;
  category?: PostCategory;
  user_id: string;
  user?: User;
  topics?: PostTopic[];
  image?: Image;
  created_at: string;
  updated_at: string;
}

export interface PostCategory {
  id: string;
  name: string;
  normalized_name: string;
}

export interface PostTopic {
  id: string;
  name: string;
  normalized_name: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  time: number;
  portion: number;
  difficulty: number;
  category_id: string;
  category?: RecipeCategory;
  user_id: string;
  user?: User;
  ingredients?: RecipeIngredient[];
  steps?: RecipeStep[];
  diets?: RecipeDiet[];
  image?: Image;
  created_at: string;
  updated_at: string;
}

export interface RecipeCategory {
  id: string;
  name: string;
  normalized_name: string;
}

export interface RecipeDiet {
  id: string;
  name: string;
  normalized_name: string;
}

export interface RecipeIngredient {
  id: string;
  quantity: number;
  name: string;
  unit_id: string;
  unit?: RecipeUnit;
  recipe_id: string;
}

export interface RecipeStep {
  id: string;
  order: number;
  description: string;
  recipe_id: string;
}

export interface RecipeUnit {
  id: string;
  name: string;
  normalized_name: string;
}

export interface PaginationParams {
  page: number;
  per_page: number;
}

export interface PaginationResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
}

export interface RecipeFilters {
  title?: string;
  category_id?: string;
  diets?: string[];
}

export interface PostFilters {
  search?: string;
  category_id?: string;
}

export type ApiResponse<T> = {
  data: T;
  message?: string;
};
