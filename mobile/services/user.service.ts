import { createApi } from "@/configs/api.config";
const api = createApi();

export const getUserByIdAsync = async (userId: string) => {
  try {
    const response = await api.get(`/user-service/users/${userId}`);
    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrentUserAsync = async () => {
  try {
    const response = await api.get("/user-service/users/me");

    const data = response.data.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserByIdAsync = async () => {
  try {
    // todo : burayı tamamla backendini.
  } catch (error) {
    console.error(error);
    throw error;
  }
};
