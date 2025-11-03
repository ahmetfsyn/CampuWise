import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { Event, Participant } from "@/types/models";
import { Skeleton } from "../ui/skeleton";

const EventParticipants = ({
  event,
  isRefetchingEvent,
}: {
  event: Event;
  isRefetchingEvent: boolean;
}) => {
  const { t: tEvents } = useTranslation("events");
  const participants = event?.participants || [];

  const maxAvatars = 3;
  const displayedParticipants = participants.slice(0, maxAvatars);
  const extraCount =
    participants.length > maxAvatars ? participants.length - maxAvatars : 0;

  return (
    <Box className="px-6 gap-2 mb-4">
      <Text className="text-md font-semibold text-primary-500">
        {tEvents("eventDetails.participants")}
      </Text>

      {isRefetchingEvent ? (
        <Box className="flex-row">
          {event?.participants.map((_, index: number) => (
            <Skeleton
              key={index}
              variant="circular"
              className={`w-12 h-12 ${index !== 0 ? "-ml-3" : ""}`}
            />
          ))}
        </Box>
      ) : (
        <Box className="flex items-start justify-center">
          <AvatarGroup>
            {displayedParticipants.map(
              (participant: Participant, index: number) => (
                <Avatar
                  key={participant.id}
                  size="md"
                  className={`-ml-${index > 0 ? 3 : 0}`}
                >
                  {participant.avatarUrl ? (
                    <AvatarImage source={{ uri: participant.avatarUrl }} />
                  ) : (
                    <AvatarFallbackText>
                      {participant.fullName}
                    </AvatarFallbackText>
                  )}
                </Avatar>
              )
            )}
            {extraCount > 0 && (
              <Avatar size="md" className="-ml-3 bg-primary-500">
                <Text className="font-semibold text-primary-0">
                  +{extraCount}
                </Text>
              </Avatar>
            )}
          </AvatarGroup>
        </Box>
      )}
    </Box>
  );
};

export default EventParticipants;
