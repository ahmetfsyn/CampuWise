import CustomMainHeader from "@/components/CustomMainHeader";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomMainHeader />,
        }}
      />

      <Stack.Screen
        name="(events)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
