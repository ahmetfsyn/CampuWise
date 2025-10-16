import { asyncStorage } from "@/utils/asyncStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      name: "app-theme",
      storage: asyncStorage,
    }
  )
);

export default useAppStore;
