import { memo } from "react";
import { Box } from "@/components/ui/box";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import AnimatedButton from "@/components/AnimatedButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileHeaderSectionProps } from "@/types/props";

const ProfileHeaderSection = ({
  colors,
  imageUrl,
  name,
  handleEditProfile,
  handleGoSettings,
}: ProfileHeaderSectionProps) => (
  <Box className="items-center bg-primary-800 rounded-xl p-6 shadow-md">
    <Avatar size="2xl" className="mb-3">
      <AvatarImage source={{ uri: imageUrl }} />
    </Avatar>

    <Text className="text-2xl font-bold text-center text-typography-0">
      {name}
    </Text>
    <Text className="text-typography-200">Bartın Üniversitesi</Text>
    <Text className="mb-4 text-typography-200">Bilgisayar Mühendisliği</Text>

    <Box className="flex-row items-center justify-center gap-3 ">
      <AnimatedButton onPress={handleEditProfile}>
        Profilini Düzenle
      </AnimatedButton>

      <AnimatedButton
        onPress={handleGoSettings}
        icon={<MaterialCommunityIcons name="cog" size={24} color={"white"} />}
      />
    </Box>
  </Box>
);

export default memo(ProfileHeaderSection);
