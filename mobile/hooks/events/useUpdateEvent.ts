import { updateEventAsync } from "@/services/event.service";
import showMessage from "@/utils/showMessage";
import { useMutation } from "@tanstack/react-query";

const useUpdateEvent = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateEventAsync,
    onSuccess: async () => {
      showMessage({
        type: "success",
        text1: "Etkinlik Güncellendi 🎉",
        text2: "Güzel geçmesi dileğiyle!",
      });
    },
    onError: (error: any) => {
      showMessage({
        type: "error",
        text1: "Etkinlik Güncellenemedi 😞",
        text2: "Lütfen daha sonra tekrar deneyin.",
      });
    },
  });

  return {
    handleUpdateEvent: mutateAsync,
    isUpdating: isPending,
  };
};

export default useUpdateEvent;
