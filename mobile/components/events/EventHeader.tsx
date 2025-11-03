import { Image } from "expo-image";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

const EventHeader = ({ event }: { event: any }) => {
  return (
    <Box className="h-64 w-full relative">
      <Image
        source={{ uri: event?.imageUrl }}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
      />
      <Box className="absolute bottom-0 left-0 right-0 p-4 bg-black/30">
        <Text className="text-2xl font-bold text-primary-0">
          {event?.title}
        </Text>
      </Box>
    </Box>
  );
};

export default EventHeader;
