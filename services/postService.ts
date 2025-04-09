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
      throw new Error("Falha ao buscar posts" + error);
    }
  }

  async getCurrentUserFavoritePosts(
    pagination: PaginationParams,
    filters?: PostFilters
  ): Promise<PaginationResponse<Post>> {
    try {
      const response = await apiClient.get<PaginationResponse<Post>>("/posts/favorites", {
        params: {
          ...filters,
          page: pagination.page,
          per_page: pagination.per_page,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Falha ao buscar posts" + error);
    }
  }

  async toggleFavoritePost(
    postId: string
  ): Promise<boolean> {
    try {
      const response = await apiClient.post("/users/favorite-post", {
        post_id: postId,
      });

      if (response.status !== 200) {
        throw new Error("Erro ao alternar favorito");
      }
      
      return true;
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
      return false;
    }
  }
}
