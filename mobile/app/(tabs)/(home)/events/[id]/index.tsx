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
import EventMenu from "@/components/events/EventMenu";

const EventDetailsScreen = () => {
  const {
    event,
    isPendingEvent,
    isJoinedEvent,
    isOrganizer,
    control,
    showMenu,
    errors,
    isJoiningEvent,
    isLeavingEvent,
    showReportModal,
    isRefetchingEvent,
    showCancelJoiningDialog,
    setShowCancelJoiningDialog,
    handleGoParticipants,
    handleReportEvent,
    handleOpenMenu,
    handleGoEditEvent,
    handleCloseMenu,
    handleShowReportModal,
    handleCancelReport,
    handlePressItem,
    onJoinEvent,
    onLeaveEvent,
  } = useEventDetails();

  if (isPendingEvent)
    return (
      <Box className="flex-1 items-center justify-center">
        <Spinner size={48} />
      </Box>
    );

  // todo : bu sayfaya gelen eventta category yok nedenini çöz. bunun yuzunden edit sayfasına giden event objesinde de category olmadıgı için guncellemede sıknıtı yaratır.

  return (
    <ScrollView contentContainerClassName="pb-8">
      <EventHeader handleOpenMenu={handleOpenMenu} event={event} />
      <EventInfo event={event} />
      <EventParticipants event={event} isRefetchingEvent={isRefetchingEvent} />
      <EventActions
        isJoinedEvent={isJoinedEvent}
        isJoiningEvent={isJoiningEvent}
        isLeavingEvent={isLeavingEvent}
        onJoinEvent={onJoinEvent}
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
      <EventMenu
        handleGoParticipants={handleGoParticipants}
        handlePressItem={handlePressItem}
        handleGoEditEvent={handleGoEditEvent}
        handleShowReportModal={handleShowReportModal}
        isOrganizer={isOrganizer}
        handleCloseMenu={handleCloseMenu}
        showMenu={showMenu}
      />
    </ScrollView>
  );
};

export default EventDetailsScreen;
