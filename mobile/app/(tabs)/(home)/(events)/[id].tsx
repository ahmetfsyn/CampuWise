import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { Image } from "expo-image";
import { events } from "@/mocks/mockData";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";

const EventDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  console.log(id);
  const event = events.find((event) => event.id === id);
  // console.log(event);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      contentContainerClassName="py-4"
      showsVerticalScrollIndicator={false}
    >
      <Box className="h-64 w-full relative">
        <Image
          source={{ uri: event?.imageUrl || "https://picsum.photos/200/200" }}
          style={{
            width: "100%",
            height: "100%",
          }}
          contentFit="cover"
        />
        <Box className="absolute bottom-0 left-0 right-0 p-4 ">
          <Text
            style={{ color: colors.background }}
            className="text-2xl font-bold  "
          >
            {event?.title}
          </Text>
        </Box>
      </Box>
      <Box className="p-6 gap-4">
        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Tarih & Saat
          </Text>
          <Text style={{ color: colors.text }} className="text-lg font-normal">
            {event?.date}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Konum
          </Text>
          <Text style={{ color: colors.text }} className="text-lg font-normal">
            {event?.place}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Açıklama
          </Text>
          <Text style={{ color: colors.text }} className="text-lg font-normal">
            {event?.description}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Organizatör
          </Text>
          <Text style={{ color: colors.text }} className="text-lg font-normal">
            {event?.participants
              .map((participant) => participant.name)
              .join(", ")}
          </Text>
        </Box>
        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Katılımcılar
          </Text>
          <Box className="flex items-start justify-center">
            {(() => {
              const participants = event?.participants || [];
              const maxAvatars = 3;
              const displayedParticipants = participants.slice(0, maxAvatars);
              const extraCount =
                participants.length > maxAvatars
                  ? participants.length - maxAvatars
                  : 0;
              return (
                <AvatarGroup>
                  {displayedParticipants.map((participant, index) => (
                    <Avatar
                      key={participant.id}
                      size="md"
                      className={` -ml-${index > 0 ? 3 : 0}`}
                    >
                      {participant.imageUrl ? (
                        <AvatarImage source={{ uri: participant.imageUrl }} />
                      ) : (
                        <AvatarFallbackText>
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallbackText>
                      )}
                    </Avatar>
                  ))}
                  {extraCount > 0 && (
                    <Avatar
                      size="md"
                      className="-ml-3"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Text
                        className="font-semibold"
                        style={{ color: colors.background }}
                      >
                        +{extraCount}
                      </Text>
                    </Avatar>
                  )}
                </AvatarGroup>
              );
            })()}
          </Box>
        </Box>
        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Etiketler
          </Text>
          <Box className="flex-row gap-2 flex-wrap">
            {event?.tags?.map((tag, index) => (
              <Badge
                key={index}
                className="gap-2 p-2 rounded-xl"
                style={{
                  backgroundColor: colors.primary,
                }}
              >
                <BadgeText
                  style={{
                    color: colors.background,
                  }}
                  className="normal-case font-bold"
                >
                  {tag}
                </BadgeText>
              </Badge>
            ))}
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({});
