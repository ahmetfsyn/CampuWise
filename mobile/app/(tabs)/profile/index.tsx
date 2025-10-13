import { FlatList, StyleSheet } from "react-native";
import { Box } from "@/components/ui/box";
import { events, users } from "@/mocks/mockData";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import ProfileFlatListHeaderComponent from "@/components/profile/ProfileFlatListHeaderComponent";
import { router } from "expo-router";
import { useCallback } from "react";

const ProfileScreen = () => {
  const { colors } = useTheme();
  const userJoinedEvents = events
    .filter((event) => event.participants.includes(users[0]))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const user = users[0];
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
        <Box
          className="p-4 mb-3 rounded-xl shadow-md"
          style={{ backgroundColor: colors.card }}
        >
          <Text style={{ color: colors.text }} className="font-medium">
            {item.title}
          </Text>
        </Box>
      )}
    />
  );
};

export default ProfileScreen;
