import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { StackHeaderProps } from "@react-navigation/stack";
import { HStack } from "./ui/hstack";
import { Box } from "./ui/box";
import useAppStore from "@/store/useAppStore";
import { Icon } from "./ui/icon";
import { ArrowLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
export type CustomInnerHeaderProps = StackHeaderProps & {
  className?: string;
};

const CustomInnerHeader = ({
  navigation,
  options,
  route,
}: CustomInnerHeaderProps) => {
  const theme = useAppStore((state) => state.theme);
  const { t } = useTranslation("routes");
  const title = t(options?.title as string) ?? route?.name ?? "Başlık";
  console.log(route.name);
  const canGoBack = navigation?.canGoBack?.() ?? false;

  // Header arka planını temaya göre ayarla
  const headerBgClass = theme === "dark" ? "bg-primary-700" : "bg-primary-500";

  return (
    <HStack
      className={`${headerBgClass} h-[90px] px-4 pt-8 rounded-b-[32px] items-center justify-between`}
    >
      <TouchableOpacity
        onPress={() => canGoBack && navigation.goBack()}
        disabled={!canGoBack}
        style={{ padding: 4, opacity: canGoBack ? 1 : 0 }}
      >
        <Icon as={ArrowLeft} size={24} className="text-primary-0" />
      </TouchableOpacity>

      <Text
        className={`text-xl font-semibold text-center flex-1 ${
          theme === "dark" ? "text-typography-50" : "text-typography-900"
        }`}
      >
        {title}
      </Text>

      <Box className="w-[28px]" />
    </HStack>
  );
};

export default CustomInnerHeader;
