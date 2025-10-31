import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { Image } from "expo-image";
import { Text } from "@/components/ui/text";
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
import showMessage from "@/utils/showMessage";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportEventFormSchema } from "@/validations/report-event-form";
import { useTranslation } from "react-i18next";
import useGetEventById from "@/hooks/events/useGetEventById";
import { Spinner } from "@/components/ui/spinner";
import useJoinEvent from "@/hooks/events/useJoinEvent";
import useAppStore from "@/store/useAppStore";

const EventDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  // todo : bu sayfada kullanıcı bilgilerini zustande kaydedip ordan çekip burda gerekli ayarlamaları yapmalısın mesela userId ye göre kişinin bu etkinliğe katılıp katılmadıgına göre butona tekrar basamasın gibi.
  const [isJoinedEvent, setJoinedEvent] = useState<boolean>(false);
  const [isReportedEvent, setIsReportedEvent] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showCancelJoiningDialog, setShowCancelJoiningDialog] =
    useState<boolean>(false);

  const { data: event, isPending: isPendingEvent } = useGetEventById(
    id as string
  );

  const { handleJoinEvent, isJoiningEvent } = useJoinEvent();

  const { t: tEvents } = useTranslation("events");
  const { t: tCommon } = useTranslation("common");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(reportEventFormSchema),
  });

  const handleCloseCancelJoiningDialog = useCallback(() => {
    setShowCancelJoiningDialog(false);
  }, []);

  const handleLeaveEvent = useCallback(() => {
    setJoinedEvent(false);
    setShowCancelJoiningDialog(false);
    showMessage({
      type: "success",
      text1: tEvents("eventDetails.toast.success.eventLeft.title"),
      text2: tEvents("eventDetails.toast.success.eventLeft.subTitle"),
    });
  }, [tEvents]);

  const onJoinEvent = useCallback(async () => {
    if (!isJoinedEvent) {
      handleJoinEvent(event?.id as string);
      setJoinedEvent(true);
    } else {
      // setJoinedEvent(false);
      setShowCancelJoiningDialog(true);
    }
  }, [isJoinedEvent, handleJoinEvent, event?.id]);

  const handleShowReportModal = useCallback(() => {
    if (!isReportedEvent) {
      setShowReportModal(true);
    } else {
      console.log("You have already reported this event. Thank u");
    }
  }, [isReportedEvent]);

  const handleReportEvent = useCallback(
    (data: any) => {
      showMessage({
        type: "success",
        text1: tEvents("eventDetails.toast.success.eventReported.title"),
        text2: tEvents("eventDetails.toast.success.eventReported.subTitle"),
      });
      setIsReportedEvent(true);
      setShowReportModal(false);
    },
    [tEvents]
  );

  const handleCancelReport = useCallback(() => {
    setShowReportModal(false);
  }, []);

  if (isPendingEvent) {
    return (
      <Box className="flex-1 items-center justify-center">
        <Spinner size={48} />
      </Box>
    );
  }

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
            {tEvents("eventDetails.dateAndTime")}
          </Text>
          <Text className="text-lg font-medium text-typography-0">
            {event?.startDate ? new Date(event.startDate).toLocaleString() : ""}
          </Text>
        </Box>

        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">
            {tEvents("eventDetails.location")}
          </Text>
          <Text className="text-lg font-medium text-typography-0">
            {event?.place}
          </Text>
        </Box>

        {event?.description && (
          <Box className="gap-2">
            <Text className="text-md font-semibold text-primary-500">
              {tEvents("eventDetails.description")}
            </Text>
            <Text className="text-lg font-medium text-typography-0">
              {event.description}
            </Text>
          </Box>
        )}

        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">
            {tEvents("eventDetails.organizer")}
          </Text>
          <Text className="text-lg font-medium text-typography-0">
            {event?.participants[0]!.fullName}
          </Text>
        </Box>
        <Box className="gap-2">
          <Text className="text-md font-semibold text-primary-500">
            {tEvents("eventDetails.participants")}
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
                      <Text className="font-semibold text-primary-0">
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
            {tEvents("eventDetails.tags")}
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
          variant={isJoinedEvent ? "outline" : "solid"}
          action={isJoinedEvent ? "secondary" : "primary"}
          className={`h-14 flex-1 `}
          textClassName="uppercase"
          isDisabled={isJoiningEvent}
          onPress={onJoinEvent}
        >
          {!isJoinedEvent
            ? tEvents("buttons.joinEvent")
            : tEvents("buttons.leaveEvent")}
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
              {tEvents("eventDetails.reportEventModal.title")}
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} className="text-typography-0" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Box className="gap-4">
              <Text className="text-typography-0">
                {tEvents("eventDetails.reportEventModal.subTitle")}
              </Text>
              <Controller
                control={control}
                name="content"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Textarea
                      isInvalid={!!errors.content}
                      size={"lg"}
                      className="text-typography-0 rounded-xl"
                    >
                      <TextareaInput
                        className="text-typography-0"
                        value={value}
                        onChangeText={onChange}
                        placeholder={tEvents(
                          "placeholders.reportingReasonPlaceholder"
                        )}
                      />
                    </Textarea>
                    {errors.content && (
                      <Text className="text-error-300">
                        {tEvents(errors.content.message as string)}
                      </Text>
                    )}
                  </>
                )}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <AnimatedButton
              action={"secondary"}
              variant={"outline"}
              onPress={handleCancelReport}
            >
              {tCommon("buttons.cancel")}
            </AnimatedButton>

            <AnimatedButton
              isDisabled={Object.keys(errors).length > 0}
              onPress={handleSubmit(handleReportEvent)}
            >
              {tCommon("buttons.submit")}
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
        <AlertDialogContent className="border-0 bg-background-0 rounded-xl">
          <AlertDialogHeader>
            <Heading className="text-typography-0 font-semibold" size="lg">
              {tEvents("eventDetails.leaveEventDialog.title")}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text className="text-typography-0" size="md">
              {tEvents("eventDetails.leaveEventDialog.subTitle")}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <AnimatedButton action={"negative"} onPress={handleLeaveEvent}>
              {tEvents("buttons.leaveEvent")}
            </AnimatedButton>
            <AnimatedButton
              action={"secondary"}
              variant={"outline"}
              onPress={handleCloseCancelJoiningDialog}
            >
              {tCommon("buttons.cancel")}
            </AnimatedButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ScrollView>
  );
};

export default EventDetailsScreen;
