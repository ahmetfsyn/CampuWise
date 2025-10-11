import EventListCard from "@/components/EventListCard";
import { events } from "@/mocks/mockData";
import { FlatList } from "react-native";

const EventsScreen = () => {
  return (
    <FlatList
      data={events}
      renderItem={({ item }) => <EventListCard {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default EventsScreen;
