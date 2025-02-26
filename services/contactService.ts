import apiClient from "./apiClient";

export const registerContact = async (data: CustomerContact): Promise<CustomerContact> => {
  try {
    const response = await apiClient.post<CustomerContact>("/contact", data);
    return response.data;
  } catch (error) {
    console.error("Error creating CustomerContact:", error);
    throw new Error("Failed to create CustomerContact");
  }
};

export interface CustomerContact {
  name: string;
  email: string;
  phone: string;
  message: string;
}