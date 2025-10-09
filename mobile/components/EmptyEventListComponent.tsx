import React, { memo } from "react";
import { Box } from "./ui/box";
import NoData from "@/assets/images/no-data.svg";
import { Text } from "./ui/text";
import { useTheme } from "@react-navigation/native";
const EmptyEventListComponent = () => {
  const { colors } = useTheme();
  return (
    <Box className="flex-1 justify-center ">
      <Box className="flex-col items-center p-2 gap-4">
        <NoData width={75} height={75}></NoData>

        <Text style={{ color: colors.secondary }}>
          Şuanda herhangi bir etkinlik bulunmamaktadır.
        </Text>
      </Box>
    </Box>
  );
};

export default memo(EmptyEventListComponent);
