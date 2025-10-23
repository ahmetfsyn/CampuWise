import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { TouchableOpacity } from "react-native";
import { memo } from "react";
import { Icon } from "./ui/icon";
import { LucideIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export type ShortcutButtonProps = {
  id: string;
  name: string;
  title: string;
  icon: LucideIcon;
  onPress: () => void;
};

const ShortcutButton = ({ icon, onPress, name }: ShortcutButtonProps) => {
  const { t } = useTranslation("home");
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ width: "48%" }}
      onPress={onPress}
    >
      <Box className="bg-primary-500 p-6 h-[128px] rounded-xl items-center justify-center gap-4">
        <Icon as={icon} size={24} className="text-primary-0" />
        <Text
          className="text-lg text-center font-semibold flex-wrap text-primary-0"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {t(`shortcutButtons.${name}`)}
          {/* {title} */}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default memo(ShortcutButton);
