import CustomInnerHeader from "@/components/CustomInnerHeader";
import CustomMainHeader from "@/components/CustomMainHeader";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomInnerHeader {...props} />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomMainHeader />,
        }}
      />

      <Stack.Screen
        name="events"
        options={{
          title: "Etkinlikler",
        }}
      />

      <Stack.Screen
        name="event-details/[id]"
        options={{
          title: "Etkinlik Detayları",
        }}
      />
    </Stack>
  );
}
