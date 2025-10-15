import { ScrollView } from "react-native";
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
import { Ban } from "lucide-react-native";

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
          <Text className="text-2xl font-bold text-primary-0 ">
            {event?.title}
          </Text>
        </Box>
      </Box>

      <Box className="p-6 gap-4">
        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">
            Tarih & Saat
          </Text>
          <Text className="text-lg font-medium text-typography-0">
            {event?.date}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">Konum</Text>
          <Text className="text-lg font-medium text-typography-0">
            {event?.place}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">
            Açıklama
          </Text>
          <Text className="text-lg font-medium text-typography-0">
            {event?.description}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">
            Organizatör(ler)
          </Text>
          <Text className="text-lg font-medium text-typography-0">
            {event?.participants
              .map((participant) => participant.fullName)
              .join(", ")}
          </Text>
        </Box>
        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">
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
                          {participant.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallbackText>
                      )}
                    </Avatar>
                  ))}
                  {extraCount > 0 && (
                    <Avatar size="md" className="-ml-3 bg-primary-500">
                      <Text className="font-semibold text-typography-0">
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
          <Text className="text-md font-semibold text-primary-500">
            Etiketler
          </Text>
          <Box className="flex-row gap-2 flex-wrap">
            {event?.tags?.map((tag, index) => (
              <Badge
                key={index}
                className="gap-2 p-2 rounded-xl bg-primary-500"
              >
                <BadgeText className="uppercase  font-bold text-primary-0">
                  {tag}
                </BadgeText>
              </Badge>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="px-6 flex-row gap-2">
        <AnimatedButton
          onPress={handleShowReportModal}
          action={"negative"}
          className=" h-14 "
          icon={<Icon as={Ban} size={24} className="text-primary-0" />}
        />

        <AnimatedButton
          className=" h-14 flex-1"
          textClassName="uppercase"
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
        <ModalContent className="border-0 bg-background-0 rounded-xl">
          <ModalHeader>
            <Heading className="text-typography-0" size="lg">
              Etkinliği Rapor Et
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Box className="gap-4">
              <Text className="text-typography-0">
                Etkinlik hakkında bir sorun mu var ? Nedenini belirterek
                incelememiz için bize rapor edebilirsin.
              </Text>
              <Textarea isRequired size={"lg"} className="text-typography-0">
                <TextareaInput
                  className="text-typography-0"
                  value={reportText}
                  onChangeText={(text) => setReportText(text)}
                  placeholder="Raporlama nedeniniz..."
                />
              </Textarea>
            </Box>
          </ModalBody>
          <ModalFooter>
            <AnimatedButton action={"secondary"} onPress={handleCancelReport}>
              Vazgeç
            </AnimatedButton>

            <AnimatedButton onPress={handleReportEvent}>Gönder</AnimatedButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={showCancelJoiningDialog}
        onClose={handleCloseCancelJoiningDialog}
        size="lg"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent className="border-0 bg-background-0 rounded-xl">
          <AlertDialogHeader>
            <Heading className="text-typography-0 font-semibold" size="lg">
              Etkinlikten ayrılmak istediğinize emin misiniz ?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text className="text-typography-0" size="md">
              Etkinlikten ayrılırsanız, katılımcılar arasından silineceksiniz.
              İsterseniz tekrar katılabilirsiniz.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <AnimatedButton onPress={handleLeaveEvent}>Ayrıl</AnimatedButton>
            <AnimatedButton
              action={"secondary"}
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
