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
        style={{
          backgroundColor: colors.card,
        }}
      >
        <Box
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <MaterialCommunityIcons
            name="map-marker"
            size={24}
            color={colors.background}
          />
        </Box>
        <Box className="flex-1">
          <Heading
            size="md"
            className="font-medium"
            style={{ color: colors.text }}
          >
            {title}
          </Heading>
          {/* <Text className="text-sm mt-1" style={{ color: colors.secondary }}>
            {category}
          </Text> */}
          <Box className="flex-row gap-2">
            <Badge
              className="rounded-full"
              style={{ backgroundColor: colors.primary }}
            >
              <BadgeText style={{ color: colors.background }}>
                {category}
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
    </TouchableOpacity>
  );
};

export default memo(MarkerCard);
