import { getAllEventsAsync } from "@/services/eventService";
import { useQuery } from "@tanstack/react-query";

const useGetAllEvents = (odataQuery?: string) => {
  return useQuery({
    queryKey: ["events", "all", odataQuery],
    queryFn: () => getAllEventsAsync(odataQuery),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllEvents;
