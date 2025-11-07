import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon } from "@/components/ui/fab";
import { Text } from "@/components/ui/text";
import { Event } from "@/types/models";
import { useLocalSearchParams } from "expo-router";
import { FileText, Share2, MoreVertical } from "lucide-react-native";
import { useState } from "react";
import { FlatList } from "react-native";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
  ActionsheetBackdrop,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import showMessage from "@/utils/showMessage";
import { exportParticipantsToPDF } from "@/utils/exportAsPDF";

const ParticipantsScreen = () => {
  const { event: eventString } = useLocalSearchParams();
  const event: Event = JSON.parse(eventString as string);

  const [showExportOptionsActionSheet, setShowExportOptionsActionSheet] =
    useState(false);

  const handleOpenExportModal = () => setShowExportOptionsActionSheet(true);
  const handleCloseActionSheet = () => setShowExportOptionsActionSheet(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleExportExcel = () => {
    showMessage({ type: "success", text1: "Excel export started..." });
    // TODO: exportToExcel(participants)
    handleCloseActionSheet();
  };

  // todo : burayı bitir (excel exportu ekle. )

  const handleExportPDF = async () => {
    // showMessage({ type: "success", text1: "Generating PDF..." });
    setIsLoading(true);
    await exportParticipantsToPDF(event.title, event.participants);
    setIsLoading(false);

    handleCloseActionSheet();
  };

  const handleShare = () => {
    showMessage({ type: "success", text1: "Preparing share options..." });
    // TODO: Share participants list
    handleCloseActionSheet();
  };

  return (
    <>
      <FlatList
        contentContainerClassName="p-6 gap-4"
        data={event.participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box className="flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage source={{ uri: item.avatarUrl }} />
            </Avatar>
            <Text className="text-lg text-typography-0">{item.fullName}</Text>
          </Box>
        )}
      />

      <Fab onPress={handleOpenExportModal}>
        <FabIcon as={MoreVertical} size={24} />
      </Fab>

      <Actionsheet
        isOpen={showExportOptionsActionSheet}
        onClose={handleCloseActionSheet}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent className="border-0">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <ActionsheetItem isDisabled={isLoading} onPress={handleExportExcel}>
            <ActionsheetIcon
              className="text-typography-0"
              as={FileText}
              size={24}
            />
            <ActionsheetItemText className="text-lg text-typography-0">
              Export as Excel (.xlsx)
            </ActionsheetItemText>
          </ActionsheetItem>

          <ActionsheetItem isDisabled={isLoading} onPress={handleExportPDF}>
            <ActionsheetIcon
              className="text-typography-0"
              as={FileText}
              size={24}
            />
            <ActionsheetItemText className="text-lg text-typography-0">
              Export as PDF (.pdf)
            </ActionsheetItemText>
          </ActionsheetItem>

          <ActionsheetItem isDisabled={isLoading} onPress={handleShare}>
            <ActionsheetIcon
              as={Share2}
              size={24}
              className="text-typography-0"
            />
            <ActionsheetItemText className="text-lg text-typography-0">
              Share via Email
            </ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default ParticipantsScreen;
