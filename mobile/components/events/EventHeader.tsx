import { Image } from "expo-image";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { TouchableOpacity } from "react-native";
import { MoreHorizontal } from "lucide-react-native";
import { Icon } from "../ui/icon";

type Props = {
  event: any;
  handleOpenMenu: () => void;
};

const EventHeader = ({ event, handleOpenMenu }: Props) => {
  return (
    <Box className="h-64 w-full relative">
      <Image
        source={{ uri: event?.imageUrl }}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
      />

      <Box className="absolute flex-row items-center justify-between bottom-0 left-0 right-0 p-4 bg-black/25">
        <Text className="text-2xl font-bold text-primary-0">
          {event?.title}
        </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={handleOpenMenu}>
          <Icon as={MoreHorizontal} className="text-primary-0" size={24} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default EventHeader;
