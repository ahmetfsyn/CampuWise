import { getAllEventsAsync } from "@/services/eventService";
import { useQuery } from "@tanstack/react-query";

const useGetAllEvents = () => {
  return useQuery({
    queryKey: ["events", "all"],
    queryFn: getAllEventsAsync,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllEvents;
