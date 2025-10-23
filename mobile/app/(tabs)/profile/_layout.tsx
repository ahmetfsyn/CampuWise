import CustomInnerHeader from "@/components/CustomInnerHeader";
import useAppStore from "@/store/useAppStore";
import { Stack } from "expo-router";

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
          title: "profile",
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "editProfile",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "settings",
        }}
      />
    </Stack>
  );
}
