import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import useGetEventById from "@/hooks/events/useGetEventById";
import useJoinEvent from "@/hooks/events/useJoinEvent";
import useLeaveEvent from "@/hooks/events/useLeaveEvent";
import { useAuthStore } from "@/store/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportEventFormSchema } from "@/validations/report-event-form";
import showMessage from "@/utils/showMessage";
import { useTranslation } from "react-i18next";

export const useEventDetails = () => {
  const { id: eventId } = useLocalSearchParams();
  const {
    data: event,
    isPending: isPendingEvent,
    isRefetching: isRefetchingEvent,
  } = useGetEventById(eventId as string);
  const { handleJoinEvent, isJoiningEvent } = useJoinEvent();
  const { handleLeaveEvent, isLeavingEvent } = useLeaveEvent();
  const user = useAuthStore((state) => state.user);
  const { t: tEvents } = useTranslation("events");

  const [isJoinedEvent, setJoinedEvent] = useState(false);
  const [isReportedEvent, setIsReportedEvent] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCancelJoiningDialog, setShowCancelJoiningDialog] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { content: "" },
    resolver: zodResolver(reportEventFormSchema),
  });

  // Kullanıcının etkinliğe katılıp katılmadığını kontrol et
  useEffect(() => {
    if (event && user) {
      const isJoined = event.participants?.some((p) => p.id === user.id);
      setJoinedEvent(isJoined || false);
    }
  }, [event, user]);

  const onJoinEvent = useCallback(() => {
    if (!isJoinedEvent) {
      handleJoinEvent(event?.id as string);
      setJoinedEvent(true);
    } else {
      setShowCancelJoiningDialog(true);
    }
  }, [isJoinedEvent, handleJoinEvent, event?.id]);

  const onLeaveEvent = useCallback(() => {
    if (event?.organizerId === user?.id) {
      setShowCancelJoiningDialog(false);

      return showMessage({
        type: "error",
        text1: tEvents(
          "eventDetails.toast.error.organizerCanNotLeaveFromEvent.title"
        ),
        text2: tEvents(
          "eventDetails.toast.error.organizerCanNotLeaveFromEvent.subTitle"
        ),
      });
    }

    handleLeaveEvent(event?.id as string);
    setJoinedEvent(false);
    setShowCancelJoiningDialog(false);
    return showMessage({
      type: "success",
      text1: tEvents("eventDetails.toast.success.eventLeft.title"),
      text2: tEvents("eventDetails.toast.success.eventLeft.subTitle"),
    });
  }, [tEvents, event?.id, handleLeaveEvent, user?.id, event?.organizerId]);

  const handleReportEvent = useCallback(
    (data: any) => {
      showMessage({
        type: "success",
        text1: tEvents("eventDetails.toast.success.eventReported.title"),
        text2: tEvents("eventDetails.toast.success.eventReported.subTitle"),
      });
      setIsReportedEvent(true);
      setShowReportModal(false);
    },
    [tEvents]
  );

  const handleCancelReport = () => setShowReportModal(false);

  return {
    event,
    isPendingEvent,
    isRefetchingEvent,
    isJoinedEvent,
    isJoiningEvent,
    isLeavingEvent,
    showReportModal,
    setShowReportModal,
    showCancelJoiningDialog,
    setShowCancelJoiningDialog,
    onJoinEvent,
    onLeaveEvent,
    handleReportEvent: handleSubmit(handleReportEvent),
    handleCancelReport,
    control,
    errors,
  };
};
