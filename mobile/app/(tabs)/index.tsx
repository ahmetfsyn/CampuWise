import { Box } from "@/components/ui/box";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { SettingsIcon } from "@/components/ui/icon";
import { useCallback } from "react";
import ShortcutButton from "@/components/ShortcutButton";
import { ScrollView } from "react-native";
import Carousel from "@/components/Carousel";

export const shortcuts = [
  {
    id: "1",
    name: "events",
    title: "Etkinlikler",
    icon: "calendar",
  },
  {
    id: "2",
    name: "announcements",
    title: "Duyurular",
    icon: "bullhorn",
  },
  {
    id: "3",
    name: "discussions",
    title: "Tartışmalar",
    icon: "frequently-asked-questions",
  },
  {
    id: "4",
    name: "reports",
    title: "Sorun Paylaş",
    icon: "share-variant",
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleCustomize = useCallback(() => {
    console.log("customized");
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1  p-4 ">
      <Box className=" p-2">
        <Text className="text-3xl font-bold" style={{ color: colors.text }}>
          Merhaba Ahmet
        </Text>
        <Text
          className="text-lg font-normal"
          style={{ color: colors.secondary }}
        >
          CampuWise' a Hoşgeldin
        </Text>
      </Box>

      <Box className="items-center">
        <Carousel />
      </Box>

      <Box className="flex-row mt-4 justify-between items-center">
        <Text className="text-xl font-semibold" style={{ color: colors.text }}>
          Kısayollar
        </Text>
        <Button
          onPress={handleCustomize}
          variant="outline"
          className="mt-2 border-0"
        >
          <ButtonText style={{ color: colors.primary }}>Özelleştir</ButtonText>
          <ButtonIcon
            as={SettingsIcon}
            color={colors.primary}
            className="ml-2"
          />
        </Button>
      </Box>

      <Box className="flex flex-row flex-wrap justify-between gap-4">
        {shortcuts.map((shortcut) => (
          <ShortcutButton {...shortcut} key={shortcut.id}></ShortcutButton>
        ))}
      </Box>

      <Box className="flex-row mt-4 justify-between items-center">
        <Text className="text-xl font-semibold" style={{ color: colors.text }}>
          Yaklaşan Ekinlikler
        </Text>
        <Button
          onPress={handleCustomize}
          variant="outline"
          className="border-0"
        >
          <ButtonText style={{ color: colors.primary }}>Daha Fazla</ButtonText>
        </Button>
      </Box>
    </ScrollView>
  );
}
