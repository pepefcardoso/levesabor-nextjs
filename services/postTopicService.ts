import { PostTopic } from "../typings/api";
import apiClient from "./apiClient";

export const getPostTopics = async (): Promise<PostTopic[]> => {
  const response = await apiClient.get("/post-topics");
  return response.data;
};

export const getPostTopic = async (id: string) => {
  return apiClient.get(`/post-topics/${id}`);
};

export const createPostTopic = async (data: FormData) => {
  return apiClient.post("/post-topics", data);
};

export const deletePostTopic = async (id: string) => {
  return apiClient.delete(`/post-topics/${id}`);
};
