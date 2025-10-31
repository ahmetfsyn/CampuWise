import { loginAsync } from "@/services/authService";
import useAppStore from "@/store/useAppStore";
import { LoginResponseDto } from "@/types/models";
import showMessage from "@/utils/showMessage";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  const { login } = useAppStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginAsync,
    onSuccess: async (data: LoginResponseDto & { rememberMe: boolean }) => {
      console.log(data);
      await login(data);
      showMessage({
        type: "success",
        text1: "Hoşgeldin 🎉",
        text2: "Seni tekrar görmek harika!",
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
