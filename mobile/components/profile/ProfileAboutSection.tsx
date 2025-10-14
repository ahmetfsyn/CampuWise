import { memo } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

const ProfileAboutSection = () => (
  <Box className="rounded-xl p-4 mt-6 shadow-md bg-primary-800">
    <Text className="text-lg font-semibold mb-2 text-typography-0">
      Hakkımda
    </Text>
    <Text className="text-typography-200">
      Yazılım geliştirme alanında tutkulu, yeni teknolojileri öğrenmeye açık bir
      mühendis.
    </Text>
  </Box>
);

export default memo(ProfileAboutSection);
