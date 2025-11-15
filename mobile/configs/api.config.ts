import { useAuthStore } from "@/store/useAuthStore";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveAccessToken,
  saveRefreshToken,
} from "@/utils/secureStorage";
import axios from "axios";
import { router } from "expo-router";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL + "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (request) => {
  const token = await getAccessToken();
  console.log("buraya girdi ve accessToken secureStorage dan alındı : ", token);
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken =
          (await getRefreshToken()) || useAuthStore.getState().tempRefreshToken; // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        console.log("refreshToken : ", refreshToken);
        const response = await axios.post(
          process.env.EXPO_PUBLIC_BASE_API_URL +
            "/api/user-service/auth/refresh-token",
          {
            refreshToken,
          }
        );
        const {
          accessToken,
          refreshToken: newRefreshToken,
          expiresIn,
        } = response.data.data;
        // Store the new access and refresh tokens.

        await saveAccessToken(accessToken, expiresIn);
        await saveRefreshToken(newRefreshToken);

        // Update the authorization header with the new access token.
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        removeTokens();
        router.replace("/auth/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
