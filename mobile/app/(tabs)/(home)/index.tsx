import { Box } from "@/components/ui/box";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { SettingsIcon } from "@/components/ui/icon";
import { useCallback } from "react";
import ShortcutButton from "@/components/ShortcutButton";
import { FlatList, ScrollView } from "react-native";
import Carousel from "@/components/Carousel";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { events, topics, users } from "@/mocks/mockData";
import EventPreviewCard from "@/components/EventPreviewCard";
import PopularTopicPreviewCard from "@/components/PopularTopicPreviewCard";
import EmptyEventListComponent from "@/components/EmptyEventListComponent";
import { Calendar, Megaphone, Utensils, HelpCircle } from "lucide-react-native";
import { useTranslation } from "react-i18next";

const ITEM_WIDTH = 192;

export const shortcuts = [
  {
    id: "1",
    name: "events",
    title: "Etkinlikler",
    icon: Calendar,
    link: "/events",
  },
  {
    id: "2",
    name: "announcements",
    title: "Duyurular",
    icon: Megaphone,
    link: "/announcements",
  },
  {
    id: "3",
    name: "foodSharing",
    title: "Yemek Paylaşımı",
    icon: Utensils, // "food-fork-drink" yerine
    link: "/discussions",
  },
  {
    id: "4",
    name: "universityQuestions",
    title: "Üniversite Soruları",
    icon: HelpCircle, // rapor/soru temasına uygun
    link: "/reports",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const user = users[0];

  const { t: tHome } = useTranslation("home");
  const { t: tCommon } = useTranslation("common");

  const handleCustomize = useCallback(() => {
    console.log("customized");
  }, []);

  const handleShowMoreEvents = useCallback(() => {
    console.log("show more events");
  }, []);

  const handleShowMoreDiscussions = useCallback(() => {
    console.log("show more discussions");
  }, []);

  const upcomingEvents = events.filter(
    (event) => new Date(event.date).getTime() >= Date.now()
  );

  const handleGoEvents = useCallback(() => {
    router.push("/events");
  }, [router]);

  const handleGoEventDetails = useCallback(
    (eventId: string) => {
      router.push({
        pathname: "/events/[id]",
        params: { id: eventId },
      });
    },
    [router]
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1  p-4 ">
      <Box className=" p-2 mb-4 flex-row justify-between items-center ">
        <Box>
          <Text className="text-3xl font-bold text-typography-0">
            {`${tHome("greeting.title")} ${user.fullName.split(" ")[0]}`}
          </Text>
          <Text className="text-lg font-normal text-typography-200">
            {tHome("greeting.subTitle")}
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

      {/* <EventDeadLineCard {...events[0]} /> */}

      <Box className="items-center my-4">
        <Carousel />
      </Box>

      <Box className="flex-row mt-4   justify-between items-center">
        <Text className="text-xl font-semibold text-typography-0">
          {tHome("sectionTitles.shortcuts")}
        </Text>
        <Button
          onPress={handleCustomize}
          variant="outline"
          className="border-0"
        >
          <ButtonText className="text-primary-500">
            {tHome("buttons.customize")}
          </ButtonText>
          <ButtonIcon as={SettingsIcon} className="text-primary-500" />
        </Button>
      </Box>

      <Box className="flex flex-row my-4 flex-wrap justify-between gap-4">
        {shortcuts.map((shortcut, index) => {
          return (
            index < 4 && (
              <ShortcutButton
                onPress={handleGoEvents}
                {...shortcut}
                key={shortcut.id}
              />
            )
          );
        })}
      </Box>

      <Box className="flex-row mt-4 mb-2 justify-between items-center">
        <Text className="text-xl font-semibold text-typography-0">
          {tHome("sectionTitles.popularTopics")}
        </Text>
        <Button
          onPress={handleShowMoreDiscussions}
          variant="outline"
          className="border-0"
        >
          <ButtonText className="text-primary-500">
            {tCommon("buttons.showMore")}
          </ButtonText>
        </Button>
      </Box>

      <FlatList
        horizontal
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
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
      />

      <Box className="flex-row mt-4 mb-2 justify-between items-center">
        <Text className="text-xl font-semibold text-typography-0">
          {tHome("sectionTitles.upcomingEvents")}
        </Text>
        {events.length !== 0 && (
          <Button
            onPress={handleShowMoreEvents}
            variant="outline"
            className="border-0"
          >
            <ButtonText className="text-primary-500">
              {tCommon("buttons.showMore")}
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
        data={upcomingEvents}
        ListEmptyComponent={EmptyEventListComponent}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <EventPreviewCard
            {...item}
            onPress={() => handleGoEventDetails(item.id)}
          />
        )}
        nestedScrollEnabled
        keyExtractor={(item) => item.id}
        style={{
          marginBottom: 24,
        }}
      />
    </ScrollView>
  );
}
