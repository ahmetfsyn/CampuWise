import { createEventAsync } from "@/services/eventService";
import showMessage from "@/utils/showMessage";
import { useMutation } from "@tanstack/react-query";

const useCreateEvent = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createEventAsync,
    onSuccess: async () => {
      showMessage({
        type: "success",
        text1: "Etkinlik Oluşturuldu 🎉",
        text2: "Güzel geçmesi dileğiyle!",
      });
    },
    onError: (error: any) => {
      // console.error("Giriş hatası:", error.response?.data || error.message);
      showMessage({
        type: "error",
        text1: "Etkinlik Oluşturulamadı 😞",
        text2: "Lütfen daha sonra tekrar deneyin.",
      });
    },
  });

  return {
    handleCreateEvent: mutateAsync,
    isCreating: isPending,
  };
};

export default useCreateEvent;
