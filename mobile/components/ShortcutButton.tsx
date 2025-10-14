import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { memo } from "react";

export type ShortcutButtonProps = {
  id: string;
  name: string;
  title: string;
  icon: string;
  onPress: () => void;
};

const ShortcutButton = ({ icon, title, onPress }: ShortcutButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ width: "48%" }}
      onPress={onPress}
    >
      <Box className="bg-primary-500 p-6 rounded-xl items-center justify-center gap-4">
        <MaterialCommunityIcons name={icon} size={32} color="white" />

        <Text
          className="text-lg text-center font-semibold flex-wrap text-primary-0"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default memo(ShortcutButton);
