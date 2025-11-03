import { leaveEventAsync } from "@/services/eventService";
import showMessage from "@/utils/showMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const useLeaveEvent = () => {
  const { t: tEvents } = useTranslation("events");
  const queryClient = useQueryClient();

  const { mutate: handleLeaveEvent, isPending } = useMutation({
    mutationFn: leaveEventAsync,
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: ["events", "all"] });
      queryClient.invalidateQueries({ queryKey: ["events", eventId] });

      showMessage({
        type: "success",
        text1: tEvents("eventDetails.toast.success.eventLeft.title"),
        text2: tEvents("eventDetails.toast.success.eventLeft.subTitle"),
      });
    },
    onError: () => {
      showMessage({
        type: "error",
        text1: "Etkinlikten ayrılamadın 😞",
        text2: "Lütfen daha sonra tekrar deneyin.",
      });
    },
  });

  return {
    handleLeaveEvent,
    isLeavingEvent: isPending,
  };
};

export default useLeaveEvent;
