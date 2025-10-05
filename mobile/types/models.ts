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

export type Marker = {
  id: string;
  category: MarkerCategory;
  title: string;
  coordinate: Coordinate;
  address?: string;
  phone?: string;
  workingHours?: string;
  description?: string;
  imageUrl?: string;
  website?: string;
};
