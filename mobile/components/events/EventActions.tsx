import { Box } from "@/components/ui/box";
import AnimatedButton from "@/components/AnimatedButton";
import { Icon } from "@/components/ui/icon";
import { Ban } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Spinner } from "../ui/spinner";

interface Props {
  isJoinedEvent: boolean;
  isJoiningEvent: boolean;
  isLeavingEvent: boolean;
  onJoinEvent: () => void;
  onShowReportModal: () => void;
}

const EventActions = ({
  isJoinedEvent,
  isJoiningEvent,
  isLeavingEvent,
  onJoinEvent,
  onShowReportModal,
}: Props) => {
  const { t: tEvents } = useTranslation("events");

  return (
    <Box className="px-6 flex-row gap-2">
      <AnimatedButton
        onPress={onShowReportModal}
        action={"negative"}
        className="h-14"
        icon={<Icon as={Ban} size={24} className="text-primary-0" />}
      />

      <AnimatedButton
        variant={isJoinedEvent ? "outline" : "solid"}
        action={isJoinedEvent ? "secondary" : "primary"}
        className="h-14 flex-1"
        textClassName="uppercase"
        isDisabled={isJoiningEvent || isLeavingEvent}
        onPress={onJoinEvent}
      >
        {isJoiningEvent || isLeavingEvent ? (
          <Spinner />
        ) : !isJoinedEvent ? (
          tEvents("buttons.joinEvent")
        ) : (
          tEvents("buttons.leaveEvent")
        )}
      </AnimatedButton>
    </Box>
  );
};

export default EventActions;
