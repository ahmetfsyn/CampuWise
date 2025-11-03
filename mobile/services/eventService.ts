import api from "@/configs/api.config";
import { Event } from "@/types/models";
import { CreateEventFormValues } from "@/validations/create-event-form";

const EVENT_SERVICE_URL_PREFIX = "/event-service";

export const createEventAsync = async (event: CreateEventFormValues) => {
  try {
    const eventDate = event.startDate.toLocaleString();

    const response = await api.post(
      EVENT_SERVICE_URL_PREFIX + "/events",
      event
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const leaveEventAsync = async (eventId: string) => {
  try {
    const response = await api.post(
      EVENT_SERVICE_URL_PREFIX + "/events/" + eventId + "/leave"
    );
    console.log(response.data);

    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const joinEventAsync = async (eventId: string) => {
  try {
    const response = await api.post(
      EVENT_SERVICE_URL_PREFIX + "/events/" + eventId + "/join"
    );
    console.log(response.data);
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEventByIdAsync = async (eventId: string) => {
  try {
    const response = await api.get(
      EVENT_SERVICE_URL_PREFIX + "/events/" + eventId
    );
    const data: Event = response.data?.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllEventsAsync = async (
  odataQuery?: string
): Promise<Event[]> => {
  try {
    const response = await api.get(
      EVENT_SERVICE_URL_PREFIX + "/odata/events" + (odataQuery ?? "")
    );
    const events: Event[] = response.data?.value;

    return events;
  } catch (error: any) {
    throw error;
  }
};
