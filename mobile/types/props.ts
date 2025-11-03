import { Event, MarkerCategory } from "./models";

export type MarkerCardProps = {
  id: string;
  category: MarkerCategory;
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  phone?: string;
  workingHouse?: string;
};

export type EventDeadLineCardProps = Event & {};
export type EventListCardProps = Event & {
  onPress: (eventId: string) => void;
};
export type ProfileHeaderSectionProps = {
  imageUrl: string;
  name: string;
  handleEditProfile: () => void;
  handleGoSettings: () => void;
};
