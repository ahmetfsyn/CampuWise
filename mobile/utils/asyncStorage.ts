import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistStorage, StorageValue } from "zustand/middleware";

export const asyncStorage: PersistStorage<any> = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    if (!value) return null;
    try {
      return JSON.parse(value) as StorageValue<any>;
    } catch {
      return null;
    }
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};
