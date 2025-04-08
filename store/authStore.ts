import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  token?: string;
  setAuthenticated: (auth: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: undefined,
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      logout: () => set({ isAuthenticated: false, token: undefined }),
    }),
    { name: "authStore" }
  )
);

export default useAuthStore;
