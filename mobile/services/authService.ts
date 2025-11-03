import { RegisterFormValues } from "@/validations/register-form";
import { LoginFormValues } from "@/validations/login-form";
import api from "@/configs/api.config";
import { LoginResponseDto } from "@/types/models";

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
    const { data } = await api.post("/user-service/auth/login", {
      email,
      password,
    });

    const tokenDetails: LoginResponseDto = {
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
      expiresIn: data.data.expiresIn,
      user: data.data.user,
    };

    return { ...tokenDetails, rememberMe };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
