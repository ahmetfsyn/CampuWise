import { Stack } from "expo-router";
import CustomInnerHeader from "@/components/CustomInnerHeader";
import { Platform } from "react-native";
import useAppStore from "@/store/useAppStore";

export default function EventsLayout() {
  const theme = useAppStore((state) => state.theme);

  return (
    <Stack
      screenOptions={{
        presentation: "transparentModal",
        contentStyle: {
          backgroundColor:
            theme === "dark" ? "rgb(18,29,44)" : "rgb(245,245,245,1)",
        },
        header: (props) => <CustomInnerHeader {...props} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Etkinlikler" }} />

      <Stack.Screen name="create" options={{ title: "Etkinlik Oluştur" }} />

      <Stack.Screen name="[id]" options={{ title: "Etkinlik Detayları" }} />
    </Stack>
  );
}
