import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../typings/user";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "userStore" }
  )
);

export default useUserStore;
