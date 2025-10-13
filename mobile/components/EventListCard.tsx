import { useTheme } from "@react-navigation/native";
import { Text } from "./ui/text";
import { Image } from "expo-image";
import { EventListCardProps } from "@/types/props";
import { TouchableOpacity } from "react-native";
import { Box } from "./ui/box";
import { memo } from "react";

const EventListCard = ({
  title,
  date,
  place,
  imageUrl,
  onPress,
}: EventListCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <Box className="mb-4 rounded-xl overflow-hidden h-64 relative">
        <Image
          source={{ uri: imageUrl || "https://picsum.photos/200/200" }}
          contentFit="cover"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        />

        <Box className="absolute bottom-0 left-0 right-0 p-3 bg-black/50">
          <Text
            style={{
              color: colors.background,
            }}
            className=" text-lg font-bold mb-1"
          >
            {title}
          </Text>
          <Text className=" text-sm">
            {date} · {place}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default memo(EventListCard);
