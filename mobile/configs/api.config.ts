import { useAuthStore } from "@/store/useAuthStore";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from "@/utils/secureStorage";
import axios from "axios";

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Access token expired

      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        const isAuth = useAuthStore.getState().isAuthenticated;
        await useAuthStore.getState().logout();
        // router.replace("/auth/login");
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
        useAuthStore.getState().logout();
        console.error("buraya geldii");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
