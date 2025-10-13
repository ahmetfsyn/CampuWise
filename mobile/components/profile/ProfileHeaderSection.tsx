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
  <Box
    className="items-center rounded-xl p-6 shadow-md"
    style={{ backgroundColor: colors.card }}
  >
    <Avatar size="2xl" className="mb-3">
      <AvatarImage source={{ uri: imageUrl }} />
    </Avatar>

    <Text
      style={{ color: colors.text }}
      className="text-2xl font-bold text-center"
    >
      {name}
    </Text>
    <Text style={{ color: colors.secondary }}>Bartın Üniversitesi</Text>
    <Text style={{ color: colors.secondary }} className="mb-4">
      Bilgisayar Mühendisliği
    </Text>

    <Box className="flex-row items-center justify-center gap-3 ">
      <AnimatedButton
        buttonClassName="flex-1 h-14 rounded-xl"
        textClassName="text-center font-semibold"
        style={{ backgroundColor: colors.primary }}
        onPress={handleEditProfile}
      >
        Profilini Düzenle
      </AnimatedButton>

      <AnimatedButton
        buttonClassName="h-full rounded-xl items-center justify-center"
        style={{ backgroundColor: colors.primary }}
        onPress={handleGoSettings}
        icon={
          <MaterialCommunityIcons
            name="cog"
            size={24}
            color={colors.background}
          />
        }
      />
    </Box>
  </Box>
);

export default memo(ProfileHeaderSection);
