import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Badge, BadgeText } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Event } from "@/types/models";
import { useMemo } from "react";

const EventInfo = ({ event }: { event: Event }) => {
  const { t: tEvents } = useTranslation("events");
  const organizerFullName = useMemo(
    () => event?.participants.find((p) => p.id === event.organizerId)?.fullName,
    [event]
  );

  return (
    <Box className="p-6 gap-4">
      <Box className="gap-2">
        <Text className="text-md font-semibold text-primary-500">
          {tEvents("eventDetails.dateAndTime")}
        </Text>
        <Text className="text-lg font-medium text-typography-0">
          {event?.startDate
            ? new Date(event.startDate).toLocaleString(undefined, {
                dateStyle: "long",
                timeStyle: "short",
              })
            : ""}
        </Text>
      </Box>

      <Box className="gap-2">
        <Text className="text-md font-semibold text-primary-500">
          {tEvents("eventDetails.location")}
        </Text>
        <Text className="text-lg font-medium text-typography-0">
          {event?.place}
        </Text>
      </Box>

      {event?.description && (
        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">
            {tEvents("eventDetails.description")}
          </Text>
          <Text className="text-lg font-medium text-typography-0">
            {event.description}
          </Text>
        </Box>
      )}

      <Box className="gap-2">
        <Text className="text-md font-semibold text-primary-500">
          {tEvents("eventDetails.organizer")}
        </Text>
        <Text className="text-lg font-medium text-typography-0">
          {organizerFullName}
        </Text>
      </Box>

      {event?.tags && (
        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">
            {tEvents("eventDetails.tags")}
          </Text>
          <Box className="flex-row gap-2 flex-wrap">
            {event.tags.map((tag: string, index: number) => (
              <Badge
                key={index}
                className="gap-2 p-2 rounded-xl bg-primary-500"
              >
                <BadgeText className="uppercase font-bold text-primary-0">
                  {tag}
                </BadgeText>
              </Badge>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EventInfo;
