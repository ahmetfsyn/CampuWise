import CustomMainHeader from "@/components/CustomMainHeader";
import useAppStore from "@/store/useAppStore";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function HomeLayout() {
  const theme = useAppStore((state) => state.theme);

  return (
    <Stack
      screenOptions={{
        presentation: "transparentModal",
        contentStyle: {
          backgroundColor:
            theme === "dark" ? "rgb(18,29,44)" : "rgb(245,245,245,1)",
        },
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
          headerShown: false,
        }}
      />
    </Stack>
  );
}
