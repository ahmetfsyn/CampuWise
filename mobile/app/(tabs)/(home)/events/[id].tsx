import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { Image } from "expo-image";
import { events } from "@/mocks/mockData";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";
import { useCallback, useState } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";

const EventDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const [isJoinedEvent, setJoinedEvent] = useState<boolean>(false);
  const [isReportedEvent, setIsReportedEvent] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showCancelJoiningDialog, setShowCancelJoiningDialog] =
    useState<boolean>(false);

  const [reportText, setReportText] = useState<string>("");

  const event = events.find((event) => event.id === id);

  const handleCloseCancelJoiningDialog = useCallback(() => {
    setShowCancelJoiningDialog(false);
  }, []);

  const handleLeaveEvent = useCallback(() => {
    setJoinedEvent(false);
    setShowCancelJoiningDialog(false);
    console.log("You have left the event. Thank u");
  }, []);

  const handleJoinEvent = useCallback(() => {
    if (!isJoinedEvent) {
      setJoinedEvent(true);
      console.log("You have joined the event. Thank u");
    } else {
      // setJoinedEvent(false);
      setShowCancelJoiningDialog(true);
    }
  }, [isJoinedEvent]);

  const handleShowReportModal = useCallback(() => {
    if (!isReportedEvent) {
      setShowReportModal(true);
    } else {
      console.log("You have already reported this event. Thank u");
    }
  }, [isReportedEvent]);

  const handleReportEvent = useCallback(() => {
    if (reportText) {
      console.log("event is reported. Thank u");
      setIsReportedEvent(true);
      setShowReportModal(false);
    }
  }, [reportText]);

  const handleCancelReport = useCallback(() => {
    setShowReportModal(false);
  }, []);

  return (
    <ScrollView
      contentContainerClassName="py-4 "
      showsVerticalScrollIndicator={false}
    >
      <Box className="h-64 w-full relative">
        <Image
          source={{ uri: event?.imageUrl || "https://picsum.photos/200/200" }}
          style={{
            width: "100%",
            height: "100%",
          }}
          contentFit="cover"
        />
        <Box className="absolute bottom-0 left-0 right-0 p-4 ">
          <Text
            style={{ color: colors.background }}
            className="text-2xl font-bold  "
          >
            {event?.title}
          </Text>
        </Box>
      </Box>

      <Box className="p-6 gap-4">
        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Tarih & Saat
          </Text>
          <Text style={{ color: colors.text }} className="text-lg font-medium">
            {event?.date}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Konum
          </Text>
          <Text style={{ color: colors.text }} className="text-lg font-medium">
            {event?.place}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Açıklama
          </Text>
          <Text style={{ color: colors.text }} className="text-lg font-medium">
            {event?.description}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Organizatör
          </Text>
          <Text style={{ color: colors.text }} className="text-lg font-medium">
            {event?.participants
              .map((participant) => participant.name)
              .join(", ")}
          </Text>
        </Box>
        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Katılımcılar
          </Text>
          <Box className="flex items-start justify-center">
            {(() => {
              const participants = event?.participants || [];
              const maxAvatars = 3;
              const displayedParticipants = participants.slice(0, maxAvatars);
              const extraCount =
                participants.length > maxAvatars
                  ? participants.length - maxAvatars
                  : 0;
              return (
                <AvatarGroup>
                  {displayedParticipants.map((participant, index) => (
                    <Avatar
                      key={participant.id}
                      size="md"
                      className={` -ml-${index > 0 ? 3 : 0}`}
                    >
                      {participant.imageUrl ? (
                        <AvatarImage source={{ uri: participant.imageUrl }} />
                      ) : (
                        <AvatarFallbackText>
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallbackText>
                      )}
                    </Avatar>
                  ))}
                  {extraCount > 0 && (
                    <Avatar
                      size="md"
                      className="-ml-3"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Text
                        className="font-semibold"
                        style={{ color: colors.background }}
                      >
                        +{extraCount}
                      </Text>
                    </Avatar>
                  )}
                </AvatarGroup>
              );
            })()}
          </Box>
        </Box>
        <Box className="gap-2">
          <Text
            style={{ color: colors.primary }}
            className="text-md font-semibold"
          >
            Etiketler
          </Text>
          <Box className="flex-row gap-2 flex-wrap">
            {event?.tags?.map((tag, index) => (
              <Badge
                key={index}
                className="gap-2 p-2 rounded-xl"
                style={{
                  backgroundColor: colors.primary,
                }}
              >
                <BadgeText
                  style={{
                    color: colors.background,
                  }}
                  className="uppercase  font-bold"
                >
                  {tag}
                </BadgeText>
              </Badge>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="px-6 flex-row gap-2">
        <AnimatedButton
          buttonClassName="h-16 rounded-xl"
          onPress={handleShowReportModal}
          style={{
            backgroundColor: isReportedEvent
              ? colors.border
              : colors.notification,
          }}
          icon={
            <MaterialCommunityIcons
              name="block-helper"
              size={24}
              color={colors.background}
            />
          }
        />

        <AnimatedButton
          buttonClassName="flex-1 h-16 rounded-xl"
          textClassName="uppercase"
          style={{
            backgroundColor: isJoinedEvent
              ? colors.notification
              : colors.primary,
          }}
          onPress={handleJoinEvent}
        >
          {!isJoinedEvent ? "Hemen Katıl" : "Etkinlikten Ayrıl"}
        </AnimatedButton>
      </Box>

      <Modal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
        }}
        size="lg"
      >
        <ModalBackdrop />
        <ModalContent
          className="border-0"
          style={{ backgroundColor: colors.card }}
        >
          <ModalHeader>
            <Heading style={{ color: colors.text }} size="lg">
              Etkinliği Rapor Et
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Box className="gap-4">
              <Text style={{ color: colors.text }}>
                Etkinlik hakkında bir sorun mu var ? Nedenini belirterek
                incelememiz için bize rapor edebilirsin.
              </Text>
              <Textarea isRequired size={"lg"}>
                <TextareaInput
                  style={{ color: colors.text }}
                  value={reportText}
                  onChangeText={(text) => setReportText(text)}
                  placeholder="Raporlama nedeniniz..."
                />
              </Textarea>
            </Box>
          </ModalBody>
          <ModalFooter>
            <AnimatedButton
              className="rounded-xl"
              style={{
                backgroundColor: colors.secondary,
              }}
              onPress={handleCancelReport}
            >
              Vazgeç
            </AnimatedButton>

            <AnimatedButton
              className="rounded-xl"
              style={{
                backgroundColor: colors.primary,
              }}
              onPress={handleReportEvent}
            >
              Gönder
            </AnimatedButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={showCancelJoiningDialog}
        onClose={handleCloseCancelJoiningDialog}
        size="lg"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent
          style={{
            backgroundColor: colors.card,
          }}
          className="border-0"
        >
          <AlertDialogHeader>
            <Heading
              style={{
                color: colors.text,
              }}
              className="text-typography-950 font-semibold"
              size="lg"
            >
              Etkinlikten ayrılmak istediğinize emin misiniz ?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text
              style={{
                color: colors.text,
              }}
              size="md"
            >
              Etkinlikten ayrılırsanız, katılımcılar arasından silineceksiniz.
              İsterseniz tekrar katılabilirsiniz.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <AnimatedButton
              className="rounded-xl"
              style={{
                backgroundColor: colors.notification,
              }}
              onPress={handleLeaveEvent}
            >
              Ayrıl
            </AnimatedButton>
            <AnimatedButton
              className="rounded-xl"
              style={{
                backgroundColor: colors.secondary,
              }}
              onPress={handleCloseCancelJoiningDialog}
            >
              Vazgeç
            </AnimatedButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ScrollView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({});
