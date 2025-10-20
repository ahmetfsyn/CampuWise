import { CreateEventFormValues } from "@/validations/create-event-form";
import api from "./api";

export const createEventAsync = async (event: CreateEventFormValues) => {
  console.log(event);
  const eventDate = event.startingDate.toLocaleString();
  console.log(eventDate);
  // const res = await api.post("/event");
};
