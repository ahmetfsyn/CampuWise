import { LucideIcon } from "lucide-react-native";

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type MapFilter = {
  id: string;
  category: MarkerCategory;
  title: string;
  icon: LucideIcon;
};

export type LanguageCode = "en" | "tr";

export enum MarkerCategory {
  Food = "Foods",
  Cafe = "Cafes",
  Faculty = "Faculties",
  Library = "Libraries",
  Stationery = "Stationeries",
  Dorm = "Dorms",
  Sport = "Sports",
  Hospital = "Hospitals",
}

export enum EventCategory {
  All = "All",
  Music = "Music",
  Art = "Art",
  Technology = "Technology",
  Sport = "Sport",
  Movie = "Movie",
}

export type Participant = {
  id: string;
  fullName?: string;
  avatarUrl?: string;
  email?: string;
};

export type AuthUser = {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarUrl?: string;
};

export type Marker = {
  id: string;
  category: MarkerCategory;
  title: string;
  coordinate: Coordinate;
  address?: string;
  phoneNumber?: string;
  workingHours?: string;
  description?: string;
  imageUrl?: string;
  website?: string;
};

export type Event = {
  id: string;
  place: string;
  title: string;
  startDate: string;
  category: EventCategory;
  description: string;
  organizerId: string;
  imageUrl?: string;
  tags?: string[];
  participants: Participant[];
};

export type Topic = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | undefined;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
};

export type LoginResponseDto = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
