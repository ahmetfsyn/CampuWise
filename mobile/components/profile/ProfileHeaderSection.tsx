import { memo } from "react";
import { Box } from "@/components/ui/box";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import AnimatedButton from "@/components/AnimatedButton";
import { ProfileHeaderSectionProps } from "@/types/props";
import { Icon } from "../ui/icon";
import { Cog } from "lucide-react-native";
import { useTranslation } from "react-i18next";

const ProfileHeaderSection = ({
  avatarUrl,
  name,
  handleEditProfile,
  handleGoSettings,
}: ProfileHeaderSectionProps) => {
  const { t } = useTranslation("profile");
  return (
    <Box className="items-center bg-background-0 rounded-xl p-6 shadow-md">
      <Avatar size="2xl" className="mb-3">
        <AvatarImage source={{ uri: avatarUrl }} />
      </Avatar>

      <Text className="text-2xl font-bold text-center text-typography-0">
        {name}
      </Text>
      <Text className="text-typography-200">{t("header.university")}</Text>
      <Text className="mb-4 text-typography-200">{t("header.department")}</Text>

      <Box className="flex-row items-center justify-center gap-3 ">
        <AnimatedButton onPress={handleEditProfile}>
          {t("header.editProfile")}
        </AnimatedButton>

        <AnimatedButton
          onPress={handleGoSettings}
          icon={<Icon as={Cog} size={24} className="text-primary-0" />}
        />
      </Box>
    </Box>
  );
};

export default memo(ProfileHeaderSection);
