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
  image?: Image;
}

export interface PostTopic {
  id: string;
  name: string;
  normalizedName: string;
  image?: Image;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  time: number;
  portion: number;
  //enum
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
  image?: Image;
}

export interface RecipeDiet {
  id: string;
  name: string;
  normalizedName: string;
  image?: Image;
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

// export interface RecipeFilterParams {
//   title?: string;
//   categoryId?: number;
//   diets?: number[];
//   orderBy?: 'title' | 'created_at' | 'time' | 'difficulty';
//   orderDirection?: 'asc' | 'desc';
//   userId?: number;
//   perPage?: number;
// }
