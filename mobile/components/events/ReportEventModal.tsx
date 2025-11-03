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
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon, CloseIcon } from "@/components/ui/icon";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import AnimatedButton from "@/components/AnimatedButton";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ReportEventModal = ({
  isOpen,
  onClose,
  control,
  errors,
  onSubmit,
}: any) => {
  const { t: tEvents } = useTranslation("events");
  const { t: tCommon } = useTranslation("common");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
            onPress={onClose}
          >
            {tCommon("buttons.cancel")}
          </AnimatedButton>

          <AnimatedButton onPress={onSubmit}>
            {tCommon("buttons.submit")}
          </AnimatedButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportEventModal;
