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
import { Heading } from "./ui/heading";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { Link, LinkText } from "./ui/link";
import AnimatedButton from "./AnimatedButton";
import { Icon } from "./ui/icon";
import { ClockIcon, MapPin, Phone, X } from "lucide-react-native";

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
                <Icon as={X} size={24} className="text-typography-0" />
              </ModalCloseButton>
            </Box>
          </ModalHeader>
        </ModalHeader>
        <ModalBody>
          <Box className="mb-4">
            <Image
              source={{ uri: markerDetails.imageUrl }}
              style={{ width: "100%", height: 180, borderRadius: 12 }}
              resizeMode="cover"
            />
          </Box>

          <Box className="gap-2">
            <Box className="flex-row items-center gap-2">
              <Icon as={ClockIcon} size={24} className="text-typography-0" />

              <Text className="text-typography-0">
                {markerDetails.workingHours || "Çalışma saatleri: Bilinmiyor"}
              </Text>
            </Box>

            <Box className="flex-row items-center gap-2">
              <Icon as={Phone} size={24} className="text-typography-0" />

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
              <Icon as={MapPin} size={24} className="text-typography-0" />

              <Text
                numberOfLines={2}
                className="text-typography-0 shrink "
                isTruncated
              >
                {markerDetails.address || "Adres bilgisi yok"}
              </Text>
            </Box>
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
