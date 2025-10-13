import CustomInnerHeader from "@/components/CustomInnerHeader";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
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
