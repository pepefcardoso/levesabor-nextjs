import {
  PaginationParams,
  PaginationResponse,
  PostTopic,
} from "../typings/api";
import apiClient from "./apiClient";

export const getPostTopics = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<PostTopic>> => {
  try {
    const response = await apiClient.get<PaginationResponse<PostTopic>>(
      "/post-topics",
      {
        params: {
          page: pagination.page,
          per_page: pagination.per_page,
        },
      }
    );

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching post topics:", error);
    throw new Error("Failed to fetch post topics");
  }
};

export const getPostTopic = async (
  id: string
): Promise<PostTopic> => {
  try {
    const response = await apiClient.get<PostTopic>(
      `/post-topics/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching post topic with ID ${id}:`, error);
    throw new Error("Failed to fetch post topic");
  }
};

export const createPostTopic = async (
  data: FormData
): Promise<PostTopic> => {
  try {
    const response = await apiClient.post<PostTopic>(
      "/post-topics",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post topic:", error);
    throw new Error("Failed to create post topic");
  }
};

export const updatePostTopic = async (
  id: string,
  data: FormData
): Promise<PostTopic> => {
  try {
    const response = await apiClient.put<PostTopic>(
      `/post-topics/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating post topic with ID ${id}:`, error);
    throw new Error("Failed to update post topic");
  }
};

export const deletePostTopic = async (
  id: string
): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(
      `/post-topics/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting post topic with ID ${id}:`, error);
    throw new Error("Failed to delete post topic");
  }
};
