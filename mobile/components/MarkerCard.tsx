import { Box } from "@/components/ui/box";
import { memo, useCallback, useState } from "react";
import { MarkerCardProps } from "@/types/props";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import MarkerDetailsModal from "@/components/MarkerDetailsModal";
import { Badge, BadgeText } from "./ui/badge";
import AnimatedPressableComponent from "./AnimatedPressable";
import { Icon } from "./ui/icon";
import { MapPin } from "lucide-react-native";
import { useTranslation } from "react-i18next";

const MarkerCard = (props: MarkerCardProps) => {
  const { t } = useTranslation("map");
  const { title, category } = props;
  const [showMarkerDetailsModal, setShowMarkerDetailsModal] =
    useState<boolean>(false);

  const handleMarkerPress = useCallback(() => {
    setShowMarkerDetailsModal(true);
  }, []);

  return (
    <AnimatedPressableComponent onPress={handleMarkerPress}>
      <Card
        variant={"outline"}
        className={
          "p-4 rounded-xl flex-row items-center gap-4 bg-background-0 "
        }
      >
        <Box className="w-12 h-12 rounded-full items-center justify-center bg-primary-500">
          <Icon as={MapPin} size={24} className="text-primary-0" />
        </Box>
        <Box className="flex-1 gap-2">
          <Heading size="md" className="font-medium text-typography-0">
            {title}
          </Heading>

          <Box className="flex-row gap-2">
            <Badge className="rounded-full bg-primary-500">
              <BadgeText className="text-primary-0 normal-case ">
                {t(`mapCategories.${category.toLowerCase()}`)}
              </BadgeText>
            </Badge>
          </Box>
        </Box>
      </Card>
      {showMarkerDetailsModal && (
        <MarkerDetailsModal
          isOpen={showMarkerDetailsModal}
          markerDetails={props}
          setShowMarkerDetailsModal={setShowMarkerDetailsModal}
        />
      )}
    </AnimatedPressableComponent>
  );
};

export default memo(MarkerCard);
