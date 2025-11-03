import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";
import { useEventDetails } from "@/hooks/events/useEventDetails";
import EventHeader from "@/components/events/EventHeader";
import EventInfo from "@/components/events/EventInfo";
import EventParticipants from "@/components/events/EventParticipants";
import EventActions from "@/components/events/EventActions";
import ReportEventModal from "@/components/events/ReportEventModal";
import LeaveEventDialog from "@/components/events/LeaveEventDialog";
import { Skeleton } from "@/components/ui/skeleton";

const EventDetailsScreen = () => {
  const {
    event,
    isPendingEvent,
    isJoinedEvent,
    onJoinEvent,
    onLeaveEvent,
    showReportModal,
    isRefetchingEvent,
    setShowReportModal,
    showCancelJoiningDialog,
    setShowCancelJoiningDialog,
    handleReportEvent,
    handleCancelReport,
    control,
    errors,
    isJoiningEvent,
    isLeavingEvent,
  } = useEventDetails();

  if (isPendingEvent)
    return (
      <Box className="flex-1 items-center justify-center">
        <Spinner size={48} />
      </Box>
    );

  return (
    <ScrollView contentContainerClassName="pb-8">
      <EventHeader event={event} />
      <EventInfo event={event} />
      <EventParticipants event={event} isRefetchingEvent={isRefetchingEvent} />
      <EventActions
        isJoinedEvent={isJoinedEvent}
        isJoiningEvent={isJoiningEvent}
        isLeavingEvent={isLeavingEvent}
        onJoinEvent={onJoinEvent}
        onShowReportModal={() => setShowReportModal(true)}
      />
      <ReportEventModal
        isOpen={showReportModal}
        onClose={handleCancelReport}
        control={control}
        errors={errors}
        onSubmit={handleReportEvent}
      />
      <LeaveEventDialog
        isOpen={showCancelJoiningDialog}
        onClose={() => setShowCancelJoiningDialog(false)}
        onConfirm={onLeaveEvent}
        isLoading={isLeavingEvent}
      />
    </ScrollView>
  );
};

export default EventDetailsScreen;
