import { getAllEventsAsync } from "@/services/eventService";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Event } from "@/types/models";

const PAGE_SIZE = 10;

const useGetAllEvents = (odataQuery: Record<string, string | number> = {}) => {
  return useInfiniteQuery<Event[], Error>({
    queryKey: ["events", "infinite", JSON.stringify(odataQuery)],

    queryFn: async ({ pageParam = 0 }) => {
      const page = typeof pageParam === "number" ? pageParam : 0;
      return getAllEventsAsync(page, PAGE_SIZE, odataQuery);
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,

    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllEvents;
