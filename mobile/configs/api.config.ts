import useAppStore from "@/store/useAppStore";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from "@/utils/secureStorage";
import axios from "axios";
import { router } from "expo-router";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// todo : burda kladım. test et session süresi bittiginde (401 aldıgında) otomatik logout oluyor mu diye
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Access token expired

      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        const isAuth = useAppStore.getState().isAuthenticated;
        await useAppStore.getState().logout();
        router.replace("/auth/login");
        console.log("logout oldu ve bura calisti api.config : ", isAuth);
        return Promise.reject(error);
      }

      try {
        const { data } = await api.post("/user-service/auth/refresh", {
          refreshToken,
        });
        // Yeni access token kaydet
        await saveAccessToken(data.accessToken, data.expiresIn);

        // Orijinal isteği tekrar dene
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        // Refresh token da geçersiz → logout
        useAppStore.getState().logout();
        console.error("buraya geldii");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
