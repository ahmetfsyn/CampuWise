import useAppStore from "@/store/useAppStore";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from "@/utils/secureStorage";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
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
      if (!refreshToken) return Promise.reject(error);

      try {
        const { data } = await api.post("/auth/refresh", { refreshToken });
        // Yeni access token kaydet
        await saveAccessToken(data.accessToken, data.expiresIn);

        // Orijinal isteği tekrar dene
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        // Refresh token da geçersiz → logout
        useAppStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
