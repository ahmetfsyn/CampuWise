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
import { LoginResponseDto, AuthUser } from "@/types/models";

type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (
    tokenDetails: LoginResponseDto & { rememberMe: boolean }
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (tokenDetails) => {
        await saveAccessToken(tokenDetails.accessToken, tokenDetails.expiresIn);
        if (tokenDetails.rememberMe)
          console.log("tokenDetails.rememberMe : ", tokenDetails.rememberMe);
        await saveRefreshToken(tokenDetails.refreshToken);

        console.log("saveRefreshToken is done", tokenDetails.refreshToken);
        set({ isAuthenticated: true, user: tokenDetails.user ?? null });
      },

      logout: async () => {
        await removeTokens();
        set({ isAuthenticated: false, user: null });
      },

      checkAuth: async () => {
        const accessToken = await getAccessToken();
        const expiry = await getAccessTokenExpiry();

        if (!accessToken || !expiry || Date.now() > expiry) {
          await removeTokens();
          set({ isAuthenticated: false, user: null });
        } else {
          // Here we keep the user info if stored, otherwise null
          set((state) => ({ isAuthenticated: true, user: state.user }));
        }
        console.log("checkAuth is done");
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
