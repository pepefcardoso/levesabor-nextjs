import apiClient from "./apiClient";

export const registerContact = async (data: CustomerContact): Promise<CustomerContact> => {
  try {
    const response = await apiClient.post<CustomerContact>("/contact", data);
    return response.data;
  } catch {
    throw new Error("Falha ao enviar mensagem. Por favor, tente novamente.");
  }
};

export interface CustomerContact {
  name: string;
  email: string;
  phone: string;
  message: string;
}
