import { PostCategory } from "../typings/api";
import apiClient from "./apiClient";

export const getPostCategories = async (): Promise<PostCategory[]> => {
  const response = await apiClient.get("/post-categories");
  return response.data;
};

export const getPostCategory = async (id: string) => {
  return apiClient.get(`/post-categories/${id}`);
};

export const createPostCategory = async (data: FormData) => {
  return apiClient.post("/post-categories", data);
};

export const deletePostCategory = async (id: string) => {
  return apiClient.delete(`/post-categories/${id}`);
};
