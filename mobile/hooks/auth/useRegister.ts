import { registerAsync } from "@/services/authService";
import showMessage from "@/utils/showMessage";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerAsync,
    onSuccess: () => {
      showMessage({
        type: "success",
        text1: "Kayıt Başarılı 🎉",
        text2: "Aramıza hoş geldin!",
      });
    },
    onError: (error: any) => {
      console.error("Kayıt hatası:", error.response?.data || error.message);
      showMessage({
        type: "error",
        text1: "Kayıt Başarısız 😞",
        text2: "Lütfen daha sonra tekrar deneyin.",
      });
    },
  });

  return {
    handleRegister: mutateAsync,
    isRegistering: isPending,
  };
};

export default useRegister;
