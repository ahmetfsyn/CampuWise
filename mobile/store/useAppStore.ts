import { asyncStorage } from "@/utils/asyncStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppStoreState = {
  theme: "dark" | "light";
  language: string;
  emailNotification: boolean;
  pushNotification: boolean;
  toggleTheme: () => void;
  toggleEmailNotification: () => void;
  togglePushNotification: () => void;
  changeLanguage: (language: string) => void;
};

const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      theme: "light",
      language: "tr",
      changeLanguage: (language) => set({ language }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      emailNotification: true,
      pushNotification: true,
      toggleEmailNotification: () =>
        set((state) => ({ emailNotification: !state.emailNotification })),
      togglePushNotification: () =>
        set((state) => ({ pushNotification: !state.pushNotification })),
    }),
    {
      name: "app-settings",
      storage: asyncStorage,
    }
  )
);

export default useAppStore;
