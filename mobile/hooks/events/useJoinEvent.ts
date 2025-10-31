import { joinEventAsync } from "@/services/eventService";
import showMessage from "@/utils/showMessage";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const useJoinEvent = () => {
  const { t: tEvents } = useTranslation("events");

  const { mutate: handleJoinEvent, isPending } = useMutation({
    mutationFn: joinEventAsync,
    onSuccess: () => {
      showMessage({
        type: "success",
        text1: tEvents("eventDetails.toast.success.eventJoined.title"),
        text2: tEvents("eventDetails.toast.success.eventJoined.subTitle"),
      });
    },
    onError: () => {
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
