import { memo } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

const ProfileAboutSection = ({ colors }) => (
  <Box
    className="rounded-xl p-4 mt-6 shadow-md"
    style={{ backgroundColor: colors.card }}
  >
    <Text className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
      Hakkımda
    </Text>
    <Text style={{ color: colors.secondary }} className="text-base">
      Yazılım geliştirme alanında tutkulu, yeni teknolojileri öğrenmeye açık bir
      mühendis.
    </Text>
  </Box>
);

export default memo(ProfileAboutSection);
