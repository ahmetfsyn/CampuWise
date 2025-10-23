import React from "react";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { useTranslation } from "react-i18next";

const ProfileJoinedEvents = () => {
  const { t } = useTranslation("profile");
  return (
    <Box>
      <Text className="text-lg font-semibold mb-3 mt-6 text-typography-0">
        {t("joinedEvents.title")}
      </Text>
    </Box>
  );
};

export default ProfileJoinedEvents;
