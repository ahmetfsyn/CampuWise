export type Coordinate = {
  latitude: number;
  longitude: number;
};

export enum MarkerCategory {
  Food = "Food",
  Cafe = "Cafe",
  Faculties = "Faculties",
  Library = "Library",
  BookStore = "BookStore",
  Dorm = "Dorm",
  Sport = "Sport",
  Hospital = "Hospital",
}

export enum EventCategory {
  All = "All",
  Music = "Music",
  Art = "Art",
  Technology = "Technology",
  Sport = "Sport",
}

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
  date: string;
  category: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  participants: User[];
};

export type Topic = {
  id: string;
  title: string;
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
