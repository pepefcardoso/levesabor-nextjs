import {
  ApiResponse,
  PaginationParams,
  PaginationResponse,
  Post,
  PostFilters,
} from "../typings/api";
import apiClient from "./apiClient";

export const getPosts = async ({
  filters,
  pagination,
}: {
  filters?: PostFilters;
  pagination: PaginationParams;
}): Promise<PaginationResponse<Post>> => {
  try {
    const response = await apiClient.get<PaginationResponse<Post>>("/posts", {
      params: {
        ...filters,
        page: pagination.page,
        per_page: pagination.perPage,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPost = async (id: string): Promise<ApiResponse<Post>> => {
  try {
    const response = await apiClient.get<ApiResponse<Post>>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw new Error("Failed to fetch post");
  }
};

export const createPost = async (data: FormData): Promise<ApiResponse<Post>> => {
  try {
    const response = await apiClient.post<ApiResponse<Post>>("/posts", data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};

export const updatePost = async (
  id: string,
  data: FormData
): Promise<ApiResponse<Post>> => {
  try {
    const response = await apiClient.put<ApiResponse<Post>>(`/posts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw new Error("Failed to update post");
  }
};

export const deletePost = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw new Error("Failed to delete post");
  }
};