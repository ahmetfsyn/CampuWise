import { memo } from "react";
import { Box } from "./ui/box";
import NoData from "@/assets/images/no-data.svg";
import { Text } from "./ui/text";
import { useTranslation } from "react-i18next";
const EmptyEventListComponent = () => {
  const { t } = useTranslation("events");
  return (
    <Box className="flex-1 justify-center items-center">
      <Box className="flex-col items-center p-2 gap-4">
        <NoData width={75} height={75} />
        <Text className="text-typography-200">{t("errors.noEventsFound")}</Text>
      </Box>
    </Box>
  );
};

export default memo(EmptyEventListComponent);
