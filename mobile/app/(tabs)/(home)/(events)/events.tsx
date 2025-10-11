import EmptyEventListComponent from "@/components/EmptyEventListComponent";
import EventListCard from "@/components/EventListCard";
import EventsFlatListHeader from "@/components/EventsFlatListHeader";
import { Box } from "@/components/ui/box";
import { eventFilters, events } from "@/mocks/mockData";
import { useMemo, useState } from "react";
import { FlatList } from "react-native";

const EventsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState(eventFilters[0]);
  const [searchString, setSearchString] = useState<string>("");

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
        renderItem={({ item }) => <EventListCard {...item} />}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default EventsScreen;
