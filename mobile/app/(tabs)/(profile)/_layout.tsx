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
    </Stack>
  );
}
