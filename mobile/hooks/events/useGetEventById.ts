import { getEventByIdAsync } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";

const useGetEventById = (eventId: string) => {
  return useQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEventByIdAsync(eventId),
    enabled: !!eventId,
    retry: 1,
  });
};

export default useGetEventById;
