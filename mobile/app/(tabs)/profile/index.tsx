import { FlatList } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import ProfileFlatListHeaderComponent from "@/components/profile/ProfileFlatListHeaderComponent";
import { router } from "expo-router";
import { useCallback } from "react";
import useGetAllEvents from "@/hooks/events/useGetAllEvents";
import useUserStore from "@/store/useUserStore";

const ProfileScreen = () => {
  const user = useUserStore((state) => state.user);

  const { data: events } = useGetAllEvents();

  const userJoinedEvents = events;
  // ?.filter((event) => event.participants.includes())
  // .sort(
  //   (a, b) =>
  //     new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  // )
  // .slice(0, 3);

  // const userJoinedEvents = events?.filter(
  //   (event) => event.participants.filter((p) => p.id === user.id).length > 0
  // );

  const handleGoEditProfile = useCallback(() => {
    router.push("/profile/edit");
  }, []);
  const handleGoSettings = useCallback(() => {
    router.push("/profile/settings");
  }, []);

  return (
    <FlatList
      data={userJoinedEvents}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="p-4 "
      ListHeaderComponent={
        <ProfileFlatListHeaderComponent
          user={user}
          handleGoEditProfile={handleGoEditProfile}
          handleGoSettings={handleGoSettings}
        />
      }
      renderItem={({ item }) => (
        <Box className="p-4 mb-3 rounded-xl shadow-md bg-background-0">
          <Text className="font-medium text-typography-0">{item.title}</Text>
        </Box>
      )}
    />
  );
};

export default ProfileScreen;
