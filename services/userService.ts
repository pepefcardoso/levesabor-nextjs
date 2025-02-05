import apiClient from "./apiClient";

export const UsersService = {
  getCurrentUser: async () => {
    const response = await apiClient.get("/user/me");
    return response.data;
  },
};