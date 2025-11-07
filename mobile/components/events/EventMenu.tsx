import { StyleSheet } from "react-native";
import React, { memo, useCallback } from "react";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";
import { Ban, Edit, EditIcon, List } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export type EventMenuProps = {
  handleCloseMenu: () => void;
  handleShowReportModal: () => void;
  handleGoEditEvent: () => void;
  handleGoParticipants: () => void;
  handlePressItem: (action: () => void) => void;
  showMenu: boolean;
  isOrganizer: boolean;
};

const EventMenu = ({
  handleCloseMenu,
  handleShowReportModal,
  handleGoEditEvent,
  handleGoParticipants,
  handlePressItem,
  showMenu,
  isOrganizer,
}: EventMenuProps) => {
  const { t } = useTranslation("events");

  return (
    <Actionsheet isOpen={showMenu} onClose={handleCloseMenu}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="border-0">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {isOrganizer && (
          <>
            <ActionsheetItem onPress={() => handlePressItem(handleGoEditEvent)}>
              <ActionsheetIcon
                className="text-typography-0"
                size={24}
                as={Edit}
              />
              <ActionsheetItemText className="text-lg text-typography-0">
                {t("eventDetails.eventMenu.buttons.edit")}
              </ActionsheetItemText>
            </ActionsheetItem>
          </>
        )}
        <ActionsheetItem onPress={() => handlePressItem(handleGoParticipants)}>
          <ActionsheetIcon size={24} as={List} className="text-typography-0" />
          <ActionsheetItemText className="text-lg text-typography-0">
            {t("eventDetails.eventMenu.buttons.showParticipants")}
          </ActionsheetItemText>
        </ActionsheetItem>

        <ActionsheetItem onPress={() => handlePressItem(handleShowReportModal)}>
          <ActionsheetIcon className="text-typography-0" size={24} as={Ban} />
          <ActionsheetItemText className="text-lg text-typography-0">
            {t("eventDetails.eventMenu.buttons.report")}
          </ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default memo(EventMenu);

const styles = StyleSheet.create({});
