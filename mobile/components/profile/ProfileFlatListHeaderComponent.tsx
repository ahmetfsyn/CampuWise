import ProfileAboutSection from "./ProfileAboutSection";
import ProfileHeaderSection from "./ProfileHeaderSection";
import { User } from "@/types/models";
import ProfileJoinedEvents from "./ProfileJoinedEvents";

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
  return (
    <>
      {/* PROFILE HEADER */}
      <ProfileHeaderSection
        user={user}
        handleEditProfile={handleGoEditProfile}
        handleGoSettings={handleGoSettings}
      />

      {/* POINT PROGRESS BAR */}
      {/* <ProfilePointsSection /> */}
    </>
  );
};

export default ProfileFlatListHeaderComponent;
