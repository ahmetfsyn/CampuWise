import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import AnimatedButton from "@/components/AnimatedButton";
import { useTranslation } from "react-i18next";

const LeaveEventDialog = ({ isOpen, onClose, onConfirm, isLoading }: any) => {
  const { t: tEvents } = useTranslation("events");
  const { t: tCommon } = useTranslation("common");

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="lg">
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
          <AnimatedButton
            action={"negative"}
            isDisabled={isLoading}
            onPress={onConfirm}
          >
            {tEvents("buttons.leaveEvent")}
          </AnimatedButton>
          <AnimatedButton
            action={"secondary"}
            variant={"outline"}
            onPress={onClose}
          >
            {tCommon("buttons.cancel")}
          </AnimatedButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveEventDialog;
