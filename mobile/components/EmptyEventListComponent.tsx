import React, { memo } from "react";
import { Box } from "./ui/box";
import NoData from "@/assets/images/no-data.svg";
import { Text } from "./ui/text";
const EmptyEventListComponent = () => {
  return (
    <Box className="flex-1 justify-center ">
      <Box className="flex-col items-center p-2 gap-4">
        <NoData width={75} height={75}></NoData>

        <Text className="text-typography-200">
          Şuanda herhangi bir etkinlik bulunmamaktadır.
        </Text>
      </Box>
    </Box>
  );
};

export default memo(EmptyEventListComponent);
