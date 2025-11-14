import { registerAsync } from "@/services/auth.service";
import showMessage from "@/utils/showMessage";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const useRegister = () => {
  const { t } = useTranslation("auth");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerAsync,
    onSuccess: () => {
      showMessage({
        type: "success",
        text1: t("register.toast.registerSuccess.title"),
        text2: t("register.toast.registerSuccess.subTitle"),
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
