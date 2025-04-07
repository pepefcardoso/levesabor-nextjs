import apiClient from "./apiClient";
import StandardService from "./standardService";
import { Post, PostFilters } from "@/typings/post";
import { PaginationParams, PaginationResponse } from "@/typings/pagination";

export class PostService extends StandardService<Post> {
  constructor() {
    super("/posts");
  }

  async getCurrentUserPosts(pagination: PaginationParams, filters?: PostFilters): Promise<PaginationResponse<Post>> {
    try {
      const response = await apiClient.get<PaginationResponse<Post>>("/posts/my", {
        params: {
          ...filters,
          page: pagination.page,
          per_page: pagination.per_page,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Falha ao buscar meus posts" + error);
    }
  }
}
