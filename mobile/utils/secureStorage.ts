import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const EXPIRY_KEY = "access_token_expiry";

// Zustand persist storage adapter
export const secureStoreStorage = {
  getItem: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: any) => {
    // Eğer value object veya non-string ise JSON.stringify ile string’e çevir
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    await SecureStore.setItemAsync(key, stringValue);
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};

// Save access token
export const saveAccessToken = async (token: string, expiresIn: number) => {
  const expiryTimestamp = Date.now() + expiresIn * 1000;
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  await SecureStore.setItemAsync(EXPIRY_KEY, expiryTimestamp.toString());
};

// Save refresh token
export const saveRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
};

// Get access token
export const getAccessToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

// Get refresh token
export const getRefreshToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

// Get access token expiry
export const getAccessTokenExpiry = async (): Promise<number | null> => {
  const val = await SecureStore.getItemAsync(EXPIRY_KEY);
  return val ? parseInt(val, 10) : null;
};

// Remove all tokens
export const removeTokens = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(EXPIRY_KEY);
};
