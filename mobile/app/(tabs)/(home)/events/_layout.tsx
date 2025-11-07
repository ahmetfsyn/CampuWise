import { Stack } from "expo-router";
import CustomInnerHeader from "@/components/CustomInnerHeader";
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
      <Stack.Screen name="index" options={{ title: "events" }} />

      <Stack.Screen name="create" options={{ title: "createEvent" }} />

      <Stack.Screen name="[id]/index" options={{ title: "eventDetails" }} />

      <Stack.Screen name="[id]/edit" options={{ title: "editEvent" }} />

      <Stack.Screen
        name="[id]/participants"
        options={{ title: "participants" }}
      />
    </Stack>
  );
}
