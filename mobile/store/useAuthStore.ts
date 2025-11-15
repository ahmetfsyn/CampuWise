import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersistStorage } from "zustand/middleware";
import {
  saveAccessToken,
  saveRefreshToken,
  removeTokens,
  getAccessToken,
  getAccessTokenExpiry,
  secureStoreStorage,
} from "@/utils/secureStorage";
import { LoginResponseDto } from "@/types/models";
import { asyncStorage } from "@/utils/asyncStorage";
import { getCurrentUserAsync } from "@/services/user.service";
import useUserStore from "./useUserStore";

type AuthState = {
  isAuthenticated: boolean;
  tempRefreshToken: string;
  login: (
    tokenDetails: LoginResponseDto & { rememberMe: boolean }
  ) => Promise<void>;
  manuelLogout: () => Promise<void>;
  autoLogout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      rememberMe: false,
      tempRefreshToken: "",
      login: async (tokenDetails) => {
        // Tokenları kaydet
        await saveAccessToken(tokenDetails.accessToken, tokenDetails.expiresIn);

        if (tokenDetails.rememberMe) {
          await asyncStorage.setItem("rememberMe", "true");

          await saveRefreshToken(tokenDetails.refreshToken);
        } else {
          set({
            tempRefreshToken: tokenDetails.refreshToken,
          });
        }

        set({ isAuthenticated: true });
      },

      manuelLogout: async () => {
        await removeTokens();
        await asyncStorage.removeItem("rememberMe");

        set({ isAuthenticated: false });
      },
      autoLogout: async () => {
        await removeTokens();
        set((state) => ({ ...state, isAuthenticated: false }));
      },

      checkAuth: async () => {
        const accessToken = await getAccessToken();
        const expiry = await getAccessTokenExpiry();

        if (!accessToken || !expiry || Date.now() > expiry) {
          await get().autoLogout();
          return;
        }

        // set({ isAuthenticated: true });
      },
    }),
    {
      name: "auth-store",
      storage: secureStoreStorage as unknown as PersistStorage<
        AuthState,
        unknown
      >,
    }
  )
);
