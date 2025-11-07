import { Box } from "@/components/ui/box";
import AnimatedButton from "@/components/AnimatedButton";
import { useTranslation } from "react-i18next";
import { Spinner } from "../ui/spinner";

interface Props {
  isJoinedEvent: boolean;
  isJoiningEvent: boolean;
  isLeavingEvent: boolean;
  onJoinEvent: () => void;
}

const EventActions = ({
  isJoinedEvent,
  isJoiningEvent,
  isLeavingEvent,
  onJoinEvent,
}: Props) => {
  const { t: tEvents } = useTranslation("events");

  return (
    <Box className="px-6 flex-row">
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
