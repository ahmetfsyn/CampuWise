import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "@/utils/secureStorage";
import { asyncStorage } from "@/utils/asyncStorage";
import axios, { AxiosInstance, AxiosError } from "axios";

export const createApi = (
  onUnauthorized?: () => Promise<void>
): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_API_URL + "/api",
    headers: { "Content-Type": "application/json" },
  });

  // Request interceptor to add access token
  api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  });

  // Response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401 && onUnauthorized) {
        await onUnauthorized();
        // Optionally retry original request
        if (error.config && error.config.headers) {
          const newToken = await getAccessToken();
          if (newToken) {
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return api.request(error.config);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

// Example default onUnauthorized handler
export const handleUnauthorized = async (): Promise<void> => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    console.log("refreshToken bulunamadi");
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/auth/refresh-token`,
      { refreshToken }
    );
    const data = response.data.data;
    console.log("refreshToken için istek atıldı ve gelen data : ", data);

    await saveAccessToken(data.accessToken, data.expiresIn);
    console.log("yeni accessToken storage a kaydedildi");

    const rememberMe = await asyncStorage.getItem("rememberMe");

    console.log("rememberMe değeri : ", rememberMe);

    if (rememberMe === "true" && data.refreshToken) {
      console.log("rememberMe değeri true geldi ve if e girdi");

      await saveRefreshToken(data.refreshToken);
      console.log("refreshToken storage a kaydedildi");
    }
  } catch {
    // Logout or handle invalid refresh token externally
  }
};
