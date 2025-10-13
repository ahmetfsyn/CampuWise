import { registerAsync } from "@/services/authService";
import { RegisterAsyncParams } from "@/types/params";
import { useCallback } from "react";

const useRegister = () => {
  useCallback(() => {}, []);

  const handleRegister = useCallback(async (data: RegisterAsyncParams) => {
    try {
      await registerAsync(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { register };
};

export default useRegister;
