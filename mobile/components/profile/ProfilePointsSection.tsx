import { memo } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

const ProfilePointsSection = ({ colors }) => (
  <Box
    className="rounded-xl p-4 mt-6 shadow-md"
    style={{ backgroundColor: colors.card }}
  >
    <Text className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
      Puan
    </Text>
    <Progress value={60}>
      <ProgressFilledTrack style={{ backgroundColor: colors.primary }} />
    </Progress>
    <Text
      className="text-base font-medium mt-2"
      style={{ color: colors.secondary }}
    >
      120 / 200
    </Text>
  </Box>
);

export default memo(ProfilePointsSection);
