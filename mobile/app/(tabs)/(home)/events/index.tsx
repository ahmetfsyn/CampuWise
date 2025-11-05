import EmptyEventListComponent from "@/components/EmptyEventListComponent";
import EventListCard from "@/components/EventListCard";
import EventsFlatListHeader from "@/components/EventsFlatListHeader";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import useGetAllEvents from "@/hooks/events/useGetAllEvents";
import { eventFilters } from "@/mocks/mockData";
import { EventCategory } from "@/types/models";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

const EventsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState(eventFilters[0]);
  const [searchString, setSearchString] = useState<string>("");
  const router = useRouter();
  const { t } = useTranslation("events");
  const {
    data: events,
    isLoading: isLoadingEvents,
    isFetching: isFetchingEvents,
    refetch: refreshEvents,
  } = useGetAllEvents();
  // selectedFilter.category === EventCategory.All
  //   ? {}
  //   : {
  //       $filter: `category eq '${selectedFilter.category}'`,
  //     }

  // todo : organizatörlere ait bir sayfa yap. orada katılımcıları listeyeip excel pdf ya da csv tarzında cıktı alabilsin.

  const filteredEvents = useMemo(() => {
    return events?.pages.flat().filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchString.toLowerCase());

      const matchesCategory =
        selectedFilter.category.toLowerCase() ===
          EventCategory.All.toLowerCase() ||
        event.category?.toLowerCase() === selectedFilter.category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [selectedFilter, searchString, events]);

  const handleCreateEvent = useCallback(() => {
    router.push("/events/create");
  }, [router]);

  const handleGoEventDetails = useCallback(
    (eventId: string) => {
      router.push(`/events/${eventId}`);
    },
    [router]
  );

  // todo: burda filtre her değşitignde flicker sorunu oluyor buna bir ara bak.
  return (
    <Box className="flex-1 p-4">
      {isLoadingEvents && !events ? (
        <Spinner />
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            extraData={events}
            style={{
              height: "100%",
            }}
            contentContainerStyle={{
              flexGrow: 1,
              height: "auto",
            }}
            onRefresh={refreshEvents}
            refreshing={isFetchingEvents}
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
            <FabIcon className="text-primary-0 " as={AddIcon} size={"lg"} />
            <FabLabel
              className="text-primary-0 font-semibold"
              numberOfLines={1}
            >
              {t("buttons.createEventFAB")}
            </FabLabel>
          </Fab>
        </>
      )}
    </Box>
  );
};

export default EventsScreen;
