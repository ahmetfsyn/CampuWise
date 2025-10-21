import i18n from "@/configs/i18n.config";
import { LanguageCode } from "@/types/models";
import { asyncStorage } from "@/utils/asyncStorage";
import { getToken, removeToken, saveToken } from "@/utils/secureStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as Localization from "expo-localization";

export type AppStoreState = {
  theme: "dark" | "light";
  language: LanguageCode;
  didInitialize: boolean;
  isSplashVisible: boolean;
  emailNotification: boolean;
  pushNotification: boolean;
  isAuthenticated: boolean;
  changeLanguage: (language: string) => void;
  toggleTheme: () => void;
  toggleEmailNotification: () => void;
  togglePushNotification: () => void;
  initialize: () => void;
  setSplash: (visible: boolean) => void;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      didInitialize: false,
      theme: "light",
      language: "tr",
      isSplashVisible: true,
      emailNotification: true,
      pushNotification: true,
      login: async (token: string) => {
        const expiry = Date.now() + 3600 * 1000;
        await saveToken(token, expiry);
        set({ isAuthenticated: true });
      },

      logout: async () => {
        await removeToken();
        set({ isAuthenticated: false });
      },

      checkAuth: async () => {
        const stored = await getToken();
        if (!stored || Date.now() > stored.expiry) {
          await removeToken();
          set({ isAuthenticated: false });
        } else {
          set({ isAuthenticated: true });
        }
      },
      initialize: async () => {
        set({ isSplashVisible: true });
        const savedLang = get().language;

        const deviceLang =
          Localization.getLocales()[0].languageCode?.split("-")[0];

        const finalLang = savedLang || (deviceLang === "tr" ? "tr" : "en");

        await i18n.changeLanguage(finalLang);
        set({ language: finalLang as LanguageCode });

        await new Promise((resolve) => setTimeout(resolve, 1500));

        set({ didInitialize: true, isSplashVisible: false });
      },
      setSplash: (visible: boolean) => set({ isSplashVisible: visible }),
      toggleTheme: async () => {
        set({ isSplashVisible: true });
        console.log("changing theme is started");
        const newTheme = get().theme === "light" ? "dark" : "light";
        await new Promise((resolve) => setTimeout(resolve, 2000));
        set({ theme: newTheme, isSplashVisible: false });
      },

      changeLanguage: (lang) => {
        set({ isSplashVisible: true });
        i18n.changeLanguage(lang);
        set({ language: lang as LanguageCode, isSplashVisible: false });
      },
      toggleEmailNotification: () =>
        set((state) => ({ emailNotification: !state.emailNotification })),
      togglePushNotification: () =>
        set((state) => ({ pushNotification: !state.pushNotification })),
    }),
    {
      name: "app-settings",
      storage: asyncStorage,
      onRehydrateStorage: () => (state) => {
        state && state.setSplash(true);
      },
    }
  )
);

export default useAppStore;
