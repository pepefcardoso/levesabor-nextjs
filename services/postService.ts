import { Post } from "../typings/api";
import apiClient from "./apiClient";

interface postPaginationResponse {
  data: Post[];
  current_page: number;
  last_page: number;
}

interface Filters {
  title: string;
  category_id: string;
  diets: string[];
}

export const getPosts = async ({
  filters,
  page,
  perPage,
}: {
  filters?: Filters;
  page: number;
  perPage: number;
}): Promise<postPaginationResponse> => {
  const response = await apiClient.get("/posts", {
    params: {
      title: filters?.title,
      category_id: filters?.category_id,
      diets: filters?.diets.join(","),
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
};

export const getPost = async (id: string) => {
  return apiClient.get(`/posts/${id}`);
};

export const createPost = async (data: FormData) => {
  return apiClient.post("/posts", data);
};

export const deletePost = async (id: string) => {
  return apiClient.delete(`/posts/${id}`);
};
