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
  userId: string;
  imageableid: string;
  imageableType: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  birthday: string;
  phone: string;
  role: RolesEnum;
  image?: Image;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  categoryId: string;
  category?: PostCategory;
  userId: string;
  user?: User;
  topics?: PostTopic[];
  image?: Image;
  createdAt: string;
  updatedAt: string;
}

export interface PostCategory {
  id: string;
  name: string;
  normalizedName: string;
}

export interface PostTopic {
  id: string;
  name: string;
  normalizedName: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  time: number;
  portion: number;
  difficulty: number;
  categoryid: string;
  category?: RecipeCategory;
  userid: string;
  user?: User;
  ingredients?: RecipeIngredient[];
  steps?: RecipeStep[];
  diets?: RecipeDiet[];
  image?: Image;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeCategory {
  id: string;
  name: string;
  normalizedName: string;
}

export interface RecipeDiet {
  id: string;
  name: string;
  normalizedName: string;
}

export interface RecipeIngredient {
  id: string;
  quantity: number;
  name: string;
  unitid: string;
  unit?: RecipeUnit;
  recipeid: string;
}

export interface RecipeStep {
  id: string;
  order: number;
  description: string;
  recipeid: string;
}

export interface RecipeUnit {
  id: string;
  name: string;
  normalizedName: string;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginationResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
}

export interface RecipeFilters {
  title?: string;
  category_id?: string;
  diets?: string[]; //Diets Id's
}

export interface PostFilters {
  title?: string;
  category_id?: string;
  topics?: string[];
}

export type ApiResponse<T> = {
  data: T;
  message?: string;
};
