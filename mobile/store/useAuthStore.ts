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
      user: null,
      login: async (tokenDetails) => {
        // Tokenları kaydet
        await saveAccessToken(tokenDetails.accessToken, tokenDetails.expiresIn);

        if (tokenDetails.rememberMe) {
          await asyncStorage.setItem("rememberMe", "true");
          await saveRefreshToken(tokenDetails.refreshToken);
        }

        // ✅ Kullanıcının bilgilerini yükle
        try {
          const user = await getCurrentUserAsync();
          useUserStore.getState().setUser(user);
          set({ isAuthenticated: true });
        } catch (err) {
          console.error("Kullanıcı bilgisi alınamadı:", err);
          // Token geçersiz olabilir, logout yap
          await get().autoLogout();
        }
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

        // ✅ Token hâlâ geçerli — kullanıcı bilgisini tekrar yükle
        try {
          const user = await getCurrentUserAsync();
          useUserStore.getState().setUser(user);
          set({ isAuthenticated: true });
        } catch (err) {
          console.error("checkAuth -> Kullanıcı yüklenemedi:", err);
          await get().autoLogout();
        }
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
