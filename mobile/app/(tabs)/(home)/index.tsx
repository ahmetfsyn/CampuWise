import { Box } from "@/components/ui/box";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { SettingsIcon } from "@/components/ui/icon";
import { useCallback } from "react";
import ShortcutButton from "@/components/ShortcutButton";
import { FlatList, ScrollView } from "react-native";
import Carousel from "@/components/Carousel";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { events, topics } from "@/mocks/mockData";
import EventPreviewCard from "@/components/EventPreviewCard";
import PopularTopicPreviewCard from "@/components/PopularTopicPreviewCard";
import EmptyEventListComponent from "@/components/EmptyEventListComponent";
import EventDeadLineCard from "@/components/EventDeadLineCard";

const ITEM_WIDTH = 192;

export const shortcuts = [
  {
    id: "1",
    name: "events",
    title: "Etkinlikler",
    icon: "calendar",
    link: "/events",
  },
  {
    id: "2",
    name: "announcements",
    title: "Duyurular",
    icon: "bullhorn",
  },
  {
    id: "4",
    name: "reports",
    title: "Üniversite Soruları",
    icon: "share-variant",
  },
  {
    id: "3",
    name: "discussions",
    title: "Yemek Paylaşımı",
    icon: "food-fork-drink",
  },
  // {
  //   id: "5",
  //   name: "share-food",
  //   title: "Yemek Paylaş",
  //   icon: "food-fork-drink",
  // },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleCustomize = useCallback(() => {
    console.log("customized");
  }, []);

  const handleShowMoreEvents = useCallback(() => {
    console.log("show more events");
  }, []);

  const handleShowMoreDiscussions = useCallback(() => {
    console.log("show more discussions");
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1  p-4 ">
      <Box className=" p-2 mb-4 flex-row justify-between items-center">
        <Box>
          <Text className="text-3xl font-bold" style={{ color: colors.text }}>
            Merhaba Ahmet
          </Text>
          <Text
            className="text-lg font-normal"
            style={{ color: colors.secondary }}
          >
            CampuWise'a Hoşgeldin
          </Text>
        </Box>
        <Avatar size={"lg"}>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </Avatar>
      </Box>

      <EventDeadLineCard {...events[0]} />

      <Box className="items-center my-4">
        <Carousel />
      </Box>

      <Box className="flex-row mt-4   justify-between items-center">
        <Text className="text-xl font-semibold" style={{ color: colors.text }}>
          Kısayollar
        </Text>
        <Button
          onPress={handleCustomize}
          variant="outline"
          className="border-0"
        >
          <ButtonText style={{ color: colors.primary }}>Özelleştir</ButtonText>
          <ButtonIcon as={SettingsIcon} color={colors.primary} />
        </Button>
      </Box>

      <Box className="flex flex-row my-4 flex-wrap justify-between gap-4">
        {shortcuts.map((shortcut, index) => {
          return (
            index < 4 && (
              <ShortcutButton {...shortcut} key={shortcut.id}></ShortcutButton>
            )
          );
        })}
      </Box>

      <Box className="flex-row mt-4 mb-2 justify-between items-center">
        <Text className="text-xl font-semibold" style={{ color: colors.text }}>
          Öğrenci Paylaşımları
        </Text>
        <Button
          onPress={handleShowMoreDiscussions}
          variant="outline"
          className="border-0"
        >
          <ButtonText style={{ color: colors.primary }}>Daha Fazla</ButtonText>
        </Button>
      </Box>

      <FlatList
        horizontal
        getItemLayout={(data, index) => ({
          length: 192,
          offset: ITEM_WIDTH * index,
          index,
        })}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        data={topics}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <PopularTopicPreviewCard {...item} />}
        nestedScrollEnabled
        keyExtractor={(item) => item.id}
        style={{
          marginBottom: 24,
        }}
      ></FlatList>

      <Box className="flex-row mt-4 mb-2 justify-between items-center">
        <Text className="text-xl font-semibold" style={{ color: colors.text }}>
          Yaklaşan Ekinlikler
        </Text>
        {events.length !== 0 && (
          <Button
            onPress={handleShowMoreEvents}
            variant="outline"
            className="border-0"
          >
            <ButtonText style={{ color: colors.primary }}>
              Daha Fazla
            </ButtonText>
          </Button>
        )}
      </Box>

      <FlatList
        horizontal
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        initialNumToRender={5}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={events}
        ListEmptyComponent={EmptyEventListComponent}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <EventPreviewCard {...item} />}
        nestedScrollEnabled
        keyExtractor={(item) => item.id}
        style={{
          marginBottom: 24,
        }}
      />
    </ScrollView>
  );
}
