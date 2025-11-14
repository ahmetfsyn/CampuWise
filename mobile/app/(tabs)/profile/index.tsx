import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Box } from "@/components/ui/box";
import ProfileFlatListHeaderComponent from "@/components/profile/ProfileFlatListHeaderComponent";
import { useState, useRef, useEffect } from "react";
import useGetAllEvents from "@/hooks/events/useGetAllEvents";
import useUserStore from "@/store/useUserStore";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Bookmark, Grid, PlusCircle } from "lucide-react-native";
import useProfile from "@/hooks/users/useProfile";
import ProfileAboutSection from "@/components/profile/ProfileAboutSection";
import ProfileTabs from "@/components/profile/ProfileTabs";

const ProfileScreen = () => {
  const user = useUserStore((state) => state.user!);
  const { data: events } = useGetAllEvents();

  // todo :  burda kaldım. buradaki tabs komponentitni tamamla ama ben her tab etkinlik ile iligli olmasın veya ona karar ver ve bitir.
  const { handleGoEditProfile, handleGoSettings } = useProfile();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const dynamicData = activeIndex === 0 ? events : [];

  return (
    <FlatList
      data={dynamicData}
      renderItem={({ item }) => <Box>{item.title}</Box>}
      ListHeaderComponent={() => (
        <Box className="gap-4">
          <ProfileFlatListHeaderComponent
            user={user}
            handleGoEditProfile={handleGoEditProfile}
            handleGoSettings={handleGoSettings}
          />

          {/* ABOUT ME SECTION */}
          <ProfileAboutSection />

          <ProfileTabs
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          {/* <FlatList nestedScrollEnabled /> */}
        </Box>
      )}
      contentContainerClassName="p-4 gap-4"
    />
  );
};

export default ProfileScreen;
