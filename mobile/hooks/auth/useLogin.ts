import { loginAsync } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginResponseDto } from "@/types/models";
import showMessage from "@/utils/showMessage";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const useLogin = () => {
  const { login } = useAuthStore();
  const { t } = useTranslation("auth");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginAsync,
    onSuccess: async (data: LoginResponseDto & { rememberMe: boolean }) => {
      await login(data);
      showMessage({
        type: "success",
        text1: t("login.toast.loginSuccess.title"),
        text2: t("login.toast.loginSuccess.subTitle"),
      });
    },
    onError: (error: any) => {
      // console.error("Giriş hatası:", error.response?.data || error.message);
      showMessage({
        type: "error",
        text1: "Giriş Başarısız 😞",
        text2: "Email ve şifrenizi kontrol edin.",
      });
    },
  });

  return {
    handleLogin: mutateAsync,
    isLogining: isPending,
  };
};

export default useLogin;
