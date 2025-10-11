import { Button, ButtonText } from "./ui/button";
import { useRouter } from "expo-router";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { EventListCardProps } from "@/types/props";
import { Image } from "expo-image";

const EventListCard = ({ title, id }: EventListCardProps) => {
  const router = useRouter();
  return (
    <Box>
      <Box
        className="flex-1 p-2 rounded-xl mb-4"
        style={{
          height: 256,
        }}
      >
        <Image
          source={{ uri: "https://picsum.photos/1080/1920?random=" + id }}
          contentFit="fill"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
      </Box>
    </Box>
  );
};

export default EventListCard;
