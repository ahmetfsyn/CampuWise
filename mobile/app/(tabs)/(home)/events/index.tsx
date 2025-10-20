import EmptyEventListComponent from "@/components/EmptyEventListComponent";
import EventListCard from "@/components/EventListCard";
import EventsFlatListHeader from "@/components/EventsFlatListHeader";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { eventFilters, events } from "@/mocks/mockData";
import { EventCategory } from "@/types/models";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";

const EventsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState(eventFilters[0]);
  const [searchString, setSearchString] = useState<string>("");
  const router = useRouter();
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchString.toLowerCase());

      const matchesCategory =
        selectedFilter.name.toLowerCase() === EventCategory.All.toLowerCase() ||
        event.category?.toLowerCase() === selectedFilter.name.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [selectedFilter, searchString]);

  const handleCreateEvent = useCallback(() => {
    router.push("/events/create");
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
        className="right-4 bottom-8 bg-primary-500"
        size="md"
        placement="bottom right"
        onPress={handleCreateEvent}
      >
        <FabIcon className="text-white" as={AddIcon} />
        <FabLabel className="text-primary-0">Etkinlik Oluştur</FabLabel>
      </Fab>
    </Box>
  );
};

export default EventsScreen;
