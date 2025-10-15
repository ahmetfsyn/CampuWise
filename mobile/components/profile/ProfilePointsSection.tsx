import { memo } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

const ProfilePointsSection = () => (
  <Box className="rounded-xl p-4 mt-6 shadow-md bg-background-0">
    <Text className="text-lg font-semibold mb-2 text-typography-0">Puan</Text>
    <Progress value={60}>
      <ProgressFilledTrack className="bg-primary-500" />
    </Progress>
    <Text className="text-base font-medium mt-2 text-typography-200">
      120 / 200
    </Text>
  </Box>
);

export default memo(ProfilePointsSection);
