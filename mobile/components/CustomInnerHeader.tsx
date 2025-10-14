import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { StackHeaderProps } from "@react-navigation/stack";
import { useCallback } from "react";
import { HStack } from "./ui/hstack";
import { Box } from "./ui/box";
import useAppStore from "@/store/useAppStore";

export type CustomInnerHeaderProps = StackHeaderProps & {
  className?: string; // opsiyonel ekstra className
};

const CustomInnerHeader = ({
  navigation,
  options,
  route,
}: CustomInnerHeaderProps) => {
  const theme = useAppStore((state) => state.theme);
  const title = options?.title ?? route?.name ?? "Başlık";

  const handleLogOut = useCallback(() => {
    console.log("Logout oldu");
    // TODO: auth logout logic
  }, []);

  const isProfileScreen =
    typeof title === "string" && title.toLocaleLowerCase("tr-TR") === "hesabım";

  const canGoBack = navigation?.canGoBack?.() ?? false;

  // Header arka planını temaya göre ayarla
  const headerBgClass = theme === "dark" ? "bg-primary-700" : "bg-primary-500";

  // Geri buton rengi
  const backIconColor = theme === "dark" ? "#fff" : "#000";

  return (
    <HStack
      className={`${headerBgClass} h-[90px] px-4 pt-8 rounded-b-[32px] items-center justify-between`}
    >
      <TouchableOpacity
        onPress={() => canGoBack && navigation.goBack()}
        disabled={!canGoBack}
        style={{ padding: 4, opacity: canGoBack ? 1 : 0 }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={backIconColor}
        />
      </TouchableOpacity>

      <Text
        className={`text-xl font-semibold text-center flex-1 ${
          theme === "dark" ? "text-typography-50" : "text-typography-900"
        }`}
      >
        {title}
      </Text>

      {isProfileScreen ? (
        <TouchableOpacity onPress={handleLogOut} style={{ padding: 4 }}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      ) : (
        <Box className="w-[28px]" />
      )}
    </HStack>
  );
};

export default CustomInnerHeader;
