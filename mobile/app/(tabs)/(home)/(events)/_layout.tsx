// app/(tabs)/(home)/(events)/_layout.tsx
import { Stack } from "expo-router";
import CustomInnerHeader from "@/components/CustomInnerHeader";

export default function EventsLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomInnerHeader {...props} />,
      }}
    >
      <Stack.Screen name="events" options={{ title: "Etkinlikler" }} />

      <Stack.Screen
        name="create-event"
        options={{ title: "Etkinlik Oluştur" }}
      />

      <Stack.Screen name="[id]" options={{ title: "Etkinlik Detayları" }} />
    </Stack>
  );
}
