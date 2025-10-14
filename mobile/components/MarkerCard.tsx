import { Box } from "@/components/ui/box";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { memo, useState } from "react";
import { MarkerCardProps } from "@/types/props";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import MarkerDetailsModal from "@/components/MarkerDetailsModal";
import { Badge, BadgeText } from "./ui/badge";

const MarkerCard = (props: MarkerCardProps) => {
  const { category, title } = props;
  const { colors } = useTheme();
  const [showMarkerDetailsModal, setShowMarkerDetailsModal] =
    useState<boolean>(false);
  const handleMarkerPress = () => {
    setShowMarkerDetailsModal(true);
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handleMarkerPress}>
      <Card
        variant="outline"
        className={"p-4 rounded-xl flex-row items-center gap-4 border-[0.2px]"}
      >
        <Box className="w-12 h-12 rounded-full items-center justify-center bg-primary-500">
          <MaterialCommunityIcons name="map-marker" size={24} color={"white"} />
        </Box>
        <Box className="flex-1">
          <Heading size="md" className="font-medium text-typography-0">
            {title}
          </Heading>

          <Box className="flex-row gap-2">
            <Badge className="rounded-full bg-primary-500">
              <BadgeText className="text-primary-0">{category}</BadgeText>
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
    </TouchableOpacity>
  );
};

export default memo(MarkerCard);
