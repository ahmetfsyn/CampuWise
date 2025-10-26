import i18n from "@/configs/i18n.config";
import { LanguageCode, LoginResponseDto } from "@/types/models";
import { asyncStorage } from "@/utils/asyncStorage";
import {
  saveAccessToken,
  saveRefreshToken,
  removeTokens,
  getAccessToken,
  getAccessTokenExpiry,
} from "@/utils/secureStorage";
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
  login: (
    tokenDetails: LoginResponseDto & { rememberMe: boolean }
  ) => Promise<void>;
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
      login: async (
        tokenDetails: LoginResponseDto & { rememberMe: boolean }
      ) => {
        await saveAccessToken(tokenDetails.accessToken, tokenDetails.expiresIn);
        console.info("AccessToken is saved");
        if (tokenDetails.rememberMe) {
          console.info("RefreshToken is saved");

          await saveRefreshToken(tokenDetails.refreshToken);
        }
        set({ isAuthenticated: true });
      },

      logout: async () => {
        await removeTokens();
        set({ isAuthenticated: false });
      },

      checkAuth: async () => {
        console.log("checkAuth is started");
        const accessToken = await getAccessToken();
        console.log("Stored Access Token : ", accessToken);
        const expiry = await getAccessTokenExpiry();

        console.log("Stored Expiry : ", expiry);

        if (!accessToken || !expiry || Date.now() > expiry) {
          await removeTokens();
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
