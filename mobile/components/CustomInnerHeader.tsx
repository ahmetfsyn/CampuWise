import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";
import { useCallback } from "react";
import { HStack } from "./ui/hstack";
import { Box } from "./ui/box";

const CustomInnerHeader = ({
  navigation,
  options,
  route,
}: StackHeaderProps) => {
  const { colors } = useTheme();

  const title = options?.title ?? route?.name ?? "Başlık";

  const handleLogOut = useCallback(() => {
    console.log("Logout oldu");
    // TODO: auth logout logic
  }, []);

  const isProfileScreen =
    typeof title === "string" && title.toLocaleLowerCase("tr-TR") === "hesabım";

  const canGoBack = navigation?.canGoBack?.() ?? false;

  return (
    <HStack
      className="h-[90px] px-4 pt-8 rounded-b-[32px] items-center justify-between"
      style={{ backgroundColor: colors.primary }}
    >
      <TouchableOpacity
        onPress={() => canGoBack && navigation.goBack()}
        disabled={!canGoBack}
        style={{ opacity: canGoBack ? 1 : 0, padding: 4 }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={colors.background}
        />
      </TouchableOpacity>

      <Text
        className="text-xl font-semibold text-center flex-1"
        style={{ color: colors.background }}
      >
        {title}
      </Text>

      {isProfileScreen ? (
        <TouchableOpacity onPress={handleLogOut} style={{ padding: 4 }}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color={colors.background}
          />
        </TouchableOpacity>
      ) : (
        <Box className="w-[28px]" />
      )}
    </HStack>
  );
};

export default CustomInnerHeader;
