import { User } from "@/types/models";
import { create } from "zustand";

export type UserStoreState = {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (data) => set((state) => ({ user: { ...state.user!, ...data } })),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
