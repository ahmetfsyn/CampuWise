import { memo } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useTranslation } from "react-i18next";

const ProfileAboutSection = () => {
  const { t } = useTranslation("profile");
  return (
    <Box className="rounded-xl p-4 mt-6 shadow-md bg-background-0">
      <Text className="text-lg font-semibold mb-2 text-typography-0">
        {t("about.title")}
      </Text>
      <Text className="text-typography-200">{t("about.description")}</Text>
    </Box>
  );
};

export default memo(ProfileAboutSection);
