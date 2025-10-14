import CustomInnerHeader from "@/components/CustomInnerHeader";
import useAppStore from "@/store/useAppStore";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function ProfileLayout() {
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
      <Stack.Screen
        name="index"
        options={{
          title: "Hesabım",
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "Profilini Düzenle",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Ayarlar",
        }}
      />
    </Stack>
  );
}
