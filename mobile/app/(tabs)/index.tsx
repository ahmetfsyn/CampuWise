import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <Box className="flex-1  p-4 ">
      <Card size={"lg"} className="w-full" variant={"filled"}>
        <Heading className="mb-3">Quick Start</Heading>
        <Text size="sm">Start building your next project in minutes</Text>
      </Card>
    </Box>
  );
}
