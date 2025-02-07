import {
  ApiResponse,
  PaginationParams,
  PaginationResponse,
  PostCategory,
} from "../typings/api";
import apiClient from "./apiClient";

export const getPostCategories = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<PostCategory>> => {
  try {
    const response = await apiClient.get<PaginationResponse<PostCategory>>(
      "/post-categories",
      {
        params: {
          page: pagination.page,
          per_page: pagination.perPage,
        },
      }
    );

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching post categories:", error);
    throw new Error("Failed to fetch posts categories");
  }
};

export const getPostCategory = async (
  id: string
): Promise<ApiResponse<PostCategory>> => {
  try {
    const response = await apiClient.get<ApiResponse<PostCategory>>(
      `/post-categories/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching post category with ID ${id}:`, error);
    throw new Error("Failed to fetch post category");
  }
};

export const createPostCategory = async (
  data: FormData
): Promise<ApiResponse<PostCategory>> => {
  try {
    const response = await apiClient.post<ApiResponse<PostCategory>>(
      "/post-categories",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post category:", error);
    throw new Error("Failed to create post category");
  }
};

export const updatePostCategory = async (
  id: string,
  data: FormData
): Promise<ApiResponse<PostCategory>> => {
  try {
    const response = await apiClient.put<ApiResponse<PostCategory>>(
      `/post-categories/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating post category with ID ${id}:`, error);
    throw new Error("Failed to update post category");
  }
};

export const deletePostCategory = async (
  id: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/post-categories/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting post category with ID ${id}:`, error);
    throw new Error("Failed to delete post category");
  }
};
