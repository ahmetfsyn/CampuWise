import { RegisterFormValues } from "@/validations/register-form";
import { LoginFormValues } from "@/validations/login-form";
import { createApi } from "@/configs/api.config";
import { LoginResponseDto } from "@/types/models";

const api = createApi();

export const registerAsync = async ({
  email,
  fullName,
  password,
}: RegisterFormValues) => {
  try {
    const { data } = await api.post("/user-service/auth/register", {
      email,
      fullName,
      password,
    });

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginAsync = async ({
  email,
  password,
  rememberMe,
}: LoginFormValues): Promise<LoginResponseDto & { rememberMe: boolean }> => {
  try {
    const response = await api.post("/user-service/auth/login", {
      email,
      password,
    });

    const data = response.data.data as LoginResponseDto;

    const tokenDetails = data;

    return { ...tokenDetails, rememberMe };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
