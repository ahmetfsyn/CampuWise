import { LoginResponseDto } from "@/types/models";
import * as SecureStore from "expo-secure-store";

export type StoredToken = LoginResponseDto;

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const EXPIRY_KEY = "access_token_expiry";

// Access token kaydet
export const saveAccessToken = async (token: string, expiresIn: number) => {
  const expiryTimestamp = Date.now() + expiresIn * 1000;

  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  await SecureStore.setItemAsync(EXPIRY_KEY, expiryTimestamp.toString());
};

// Refresh token kaydet
export const saveRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
};

// Access token al
export const getAccessToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

// Refresh token al
export const getRefreshToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

// Expiry al
export const getAccessTokenExpiry = async (): Promise<number | null> => {
  const val = await SecureStore.getItemAsync(EXPIRY_KEY);
  return val ? parseInt(val, 10) : null;
};

// Token sil
export const removeTokens = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(EXPIRY_KEY);
};
