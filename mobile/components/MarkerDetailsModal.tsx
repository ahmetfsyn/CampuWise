import { Image, Linking, StyleSheet } from "react-native";
import { memo } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Heading } from "./ui/heading";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import MapView from "react-native-maps";
import { ButtonText } from "./ui/button";
import { Link, LinkText } from "./ui/link";
import AnimatedButton from "./AnimatedButton";

export type MarkerDetailsModalProps = {
  setShowMarkerDetailsModal: (value: boolean) => void;
  isOpen: boolean;
  markerDetails: any;
};
const MarkerDetailsModal = ({
  isOpen,
  markerDetails,
  setShowMarkerDetailsModal,
}: MarkerDetailsModalProps) => {
  const { colors } = useTheme();
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowMarkerDetailsModal(false);
      }}
      size={"lg"}
    >
      <ModalBackdrop />
      <ModalContent className="rounded-xl border-0">
        <ModalHeader>
          <ModalHeader>
            <Box className="flex-row justify-between items-start">
              <Box className="flex-1 pr-2">
                <Heading
                  size="md"
                  className="font-medium text-typography-0"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {markerDetails.title}
                </Heading>
                <Heading
                  size="sm"
                  className="font-normal text-typography-200"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {markerDetails.description}
                </Heading>
              </Box>

              <ModalCloseButton
                onPress={() => setShowMarkerDetailsModal(false)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={"white"}
                />
              </ModalCloseButton>
            </Box>
          </ModalHeader>
        </ModalHeader>
        <ModalBody>
          <Box className="mb-4 ">
            <Image
              source={{ uri: markerDetails.imageUrl }}
              style={{ width: "100%", height: 180, borderRadius: 12 }}
              resizeMode="cover"
            />
          </Box>

          <Box className="flex-row items-center gap-2">
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color={"white"}
            />
            <Text className="text-typography-0">
              {markerDetails.workingHours || "Çalışma saatleri: Bilinmiyor"}
            </Text>
          </Box>

          <Box className="flex-row items-center gap-2">
            <MaterialCommunityIcons name="phone" size={20} color={"white"} />

            {markerDetails.phoneNumber ? (
              <Link
                onPress={() =>
                  Linking.openURL(`tel:${markerDetails.phoneNumber}`)
                }
                isExternal
              >
                <LinkText size="lg" className="text-primary-500">
                  {markerDetails.phoneNumber}
                </LinkText>
              </Link>
            ) : (
              <Text className="text-typography-0">İletişim bilgisi yok</Text>
            )}
          </Box>
          <Box className="flex-row items-center gap-2">
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={"white"}
            />
            <Text
              numberOfLines={2}
              className="text-typography-0"
              ellipsizeMode="tail"
            >
              {markerDetails.address || "Adres bilgisi yok"}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <AnimatedButton
            size={"lg"}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps?q=${markerDetails.coordinate.latitude},${markerDetails.coordinate.longitude}`
              )
            }
            className="flex-1"
          >
            Yol Tarifi Al
          </AnimatedButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(MarkerDetailsModal);

const styles = StyleSheet.create({});
