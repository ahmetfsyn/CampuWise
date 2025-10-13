import EmptyEventListComponent from "@/components/EmptyEventListComponent";
import EventListCard from "@/components/EventListCard";
import EventsFlatListHeader from "@/components/EventsFlatListHeader";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { eventFilters, events } from "@/mocks/mockData";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";

const EventsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState(eventFilters[0]);
  const [searchString, setSearchString] = useState<string>("");
  const router = useRouter();
  const { colors } = useTheme();
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchString.toLowerCase());
      const matchesCategory =
        selectedFilter.name === "all" ||
        event.category?.toLowerCase() === selectedFilter.name.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [selectedFilter, searchString]);

  const handleCreateEvent = useCallback(() => {
    router.push("/events/create-event");
  }, [router]);

  const handleGoEventDetails = useCallback(
    (eventId: string) => {
      router.push(`/events/${eventId}`);
    },
    [router]
  );

  return (
    <Box className="flex-1 p-4">
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={
          <EventsFlatListHeader
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            searchString={searchString}
            setSearchString={setSearchString}
          />
        }
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListEmptyComponent={<EmptyEventListComponent />}
        data={filteredEvents}
        renderItem={({ item }) => (
          <EventListCard
            onPress={() => handleGoEventDetails(item.id)}
            {...item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <Fab
        style={{
          backgroundColor: colors.primary,
        }}
        className="right-4 bottom-8"
        size="md"
        placement="bottom right"
        onPress={handleCreateEvent}
      >
        <FabIcon style={{ color: colors.background }} as={AddIcon} />
        <FabLabel style={{ color: colors.background }}>
          Etkinlik Oluştur
        </FabLabel>
      </Fab>
    </Box>
  );
};

export default EventsScreen;
