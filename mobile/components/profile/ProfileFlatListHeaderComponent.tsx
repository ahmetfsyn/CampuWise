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
  const { fullName, attributes } = user;

  return (
    <>
      {/* PROFILE HEADER */}
      <ProfileHeaderSection
        avatarUrl={attributes.avatarUrl || ""}
        name={fullName}
        handleEditProfile={handleGoEditProfile}
        handleGoSettings={handleGoSettings}
      />
      {/* ABOUT ME SECTION */}
      <ProfileAboutSection />

      {/* POINT PROGRESS BAR */}
      {/* <ProfilePointsSection /> */}

      <ProfileJoinedEvents />
    </>
  );
};

export default ProfileFlatListHeaderComponent;
