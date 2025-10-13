import { LoginAsyncParams, RegisterAsyncParams } from "@/types/params";

export const registerAsync = async ({
  email,
  fullName,
  password,
}: RegisterAsyncParams) => {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginAsync = async ({ email, password }: LoginAsyncParams) => {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
};
