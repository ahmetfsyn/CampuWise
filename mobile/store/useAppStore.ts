import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppStoreState = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      storage: null,
      name: "app-storage",
    }
  )
);

export default useAppStore;
