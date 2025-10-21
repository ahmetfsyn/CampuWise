import * as SecureStore from "expo-secure-store";

type TokenData = {
  token: string;
  expiry: number;
  // timestamp olarak saklayacağız
};

// Token kaydet
export const saveToken = async (token: string, expiry: number) => {
  const data: TokenData = { token, expiry };
  await SecureStore.setItemAsync("authToken", JSON.stringify(data));
};

// Token al
export const getToken = async (): Promise<TokenData | null> => {
  const stored = await SecureStore.getItemAsync("authToken");
  if (!stored) return null;
  return JSON.parse(stored);
};

// Token sil
export const removeToken = async () => {
  await SecureStore.deleteItemAsync("authToken");
};
