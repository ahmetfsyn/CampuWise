import { joinEventAsync } from "@/services/event.service";
import showMessage from "@/utils/showMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const useJoinEvent = (options?: { onSuccess?: () => void }) => {
  const { t: tEvents } = useTranslation("events");
  const queryClient = useQueryClient();

  const { mutate: handleJoinEvent, isPending } = useMutation({
    mutationFn: joinEventAsync,
    onSuccess: (_, eventId) => {
      options?.onSuccess?.();

      queryClient.invalidateQueries({ queryKey: ["events", "all"] });
      queryClient.invalidateQueries({
        queryKey: ["events", eventId],
      });

      showMessage({
        type: "success",
        text1: tEvents("eventDetails.toast.success.eventJoined.title"),
        text2: tEvents("eventDetails.toast.success.eventJoined.subTitle"),
      });
    },
    onError: (error) => {
      showMessage({
        type: "error",
        text1: "Etkinliğe katılım başarısız 😞",
        text2: "Lütfen daha sonra tekrar deneyin.",
      });
    },
  });

  return {
    handleJoinEvent,
    isJoiningEvent: isPending,
  };
};

export default useJoinEvent;
