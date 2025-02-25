import { PaginationParams, PaginationResponse, User } from "../typings/api";
import apiClient from "./apiClient";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get<User>("/user/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user", error);
    throw new Error("Failed to fetch user");
  }
};

export const getUsers = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<User>> => {
  try {
    const response = await apiClient.get<PaginationResponse<User>>("/users", {
      params: {
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw new Error("Failed to fetch user");
  }
};

export const createUser = async (data: FormData): Promise<User> => {
  try {
    const response = await apiClient.post<User>("/users", data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (id: string, data: FormData): Promise<User> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<User>(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw new Error("Failed to delete user");
  }
};
