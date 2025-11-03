import ProfileAboutSection from "./ProfileAboutSection";
import ProfileHeaderSection from "./ProfileHeaderSection";
import { users } from "@/mocks/mockData";
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
  const { fullName, imageUrl } = users[0];

  return (
    <>
      {/* PROFILE HEADER */}
      <ProfileHeaderSection
        imageUrl={imageUrl as string}
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
