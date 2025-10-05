export type MarkerCardProps = {
  id: string;
  category: string;
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  phone?: string;
  workingHouse?: string;
};
