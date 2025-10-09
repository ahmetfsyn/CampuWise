import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { memo } from "react";

export type ShortcutButtonProps = {
  id: string;
  name: string;
  title: string;
  icon: string;
};

const ShortcutButton = ({ icon, id, name, title }: ShortcutButtonProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.5} style={{ width: "48%" }}>
      <Box
        className="bg-primary p-6 rounded-xl items-center justify-center gap-4"
        style={{ backgroundColor: colors.primary }}
      >
        <MaterialCommunityIcons name={icon} size={32} color="white" />

        <Text
          className="text-lg text-center font-semibold flex-wrap"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: colors.background }}
        >
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default memo(ShortcutButton);
