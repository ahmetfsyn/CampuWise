import { createApi } from "@/configs/api.config";
import { Event } from "@/types/models";
import { CreateEventFormValues } from "@/validations/create-event-form";

const api = createApi();

const EVENT_SERVICE_URL_PREFIX = "/event-service";

export const createEventAsync = async (event: CreateEventFormValues) => {
  try {
    const response = await api.post(`${EVENT_SERVICE_URL_PREFIX}/events`, {
      ...event,
      imageBase64: event.image?.base64,
    });
    return response.data;
  } catch (error) {
    console.error("❌ createEventAsync error:", error);
    throw error;
  }
};

export const leaveEventAsync = async (eventId: string) => {
  try {
    const response = await api.post(
      EVENT_SERVICE_URL_PREFIX + "/events/" + eventId + "/leave"
    );

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

    // todo : bu metodun backendinde category verisi düzgün gelmiyor. önce backende bak sonra mobile tarafına bak.

    // console.log("gelen event: ", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllEventsAsync = async (
  page: number,
  pageSize: number,
  odataParams: Record<string, string | number> = {}
): Promise<Event[]> => {
  try {
    const skip = page * pageSize;

    const baseParams = Object.entries(odataParams)
      .filter(([_, v]) => v !== undefined && v !== null)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const finalQuery = `${baseParams}${
      baseParams ? "&" : ""
    }$top=${pageSize}&$skip=${skip}`;

    const response = await api.get(
      `${EVENT_SERVICE_URL_PREFIX}/odata/events?${finalQuery}`
    );

    const events: Event[] = response.data?.value ?? [];

    return events;
  } catch (error: any) {
    console.error("❌ getAllEventsAsync error:", error);
    throw error;
  }
};

export const updateEventAsync = async (updatedEvent: Event) => {
  try {
    // todo : backendde update isteği yap
  } catch (error) {
    console.error(error);
    throw error;
  }
};
