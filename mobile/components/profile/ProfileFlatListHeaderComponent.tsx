import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import ProfileAboutSection from "./ProfileAboutSection";
import ProfilePointsSection from "./ProfilePointsSection";
import ProfileHeaderSection from "./ProfileHeaderSection";
import { users } from "@/mocks/mockData";
import { User } from "@/types/models";

export type ProfileFlatListHeaderComponentProps = {
  handleGoEditProfile: () => void;
  handleGoSettings: () => void;
  user: User;
};

const ProfileFlatListHeaderComponent = ({
  user,
  handleGoEditProfile,
  handleGoSettings,
}: ProfileFlatListHeaderComponentProps) => {
  const { fullName, imageUrl } = users[0];

  return (
    <>
      {/* PROFILE HEADER */}
      <ProfileHeaderSection
        imageUrl={imageUrl}
        name={fullName}
        handleEditProfile={handleGoEditProfile}
        handleGoSettings={handleGoSettings}
      />
      {/* ABOUT ME SECTION */}
      <ProfileAboutSection />

      {/* POINT PROGRESS BAR */}
      <ProfilePointsSection />

      <Text className="text-lg font-semibold mb-3 mt-6 text-typography-0">
        Katıldığı Etkinlikler
      </Text>
    </>
  );
};

export default ProfileFlatListHeaderComponent;
