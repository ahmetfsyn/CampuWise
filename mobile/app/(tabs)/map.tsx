import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { useTheme } from "@react-navigation/native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text } from "@/components/ui/text";
import { MarkerCardProps } from "@/types/props";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

const mapFilters = [
  {
    id: "1",
    name: "Food",
    displayName: "Yemekler",
    icon: "food",
  },
  {
    id: "2",
    name: "Cafe",
    displayName: "Kafeler",
    icon: "coffee",
  },
  {
    id: "3",
    name: "Faculties",
    displayName: "Fakülteler",
    icon: "school",
  },
  {
    id: "4",
    name: "Library",
    displayName: "Kütüphaneler",
    icon: "library",
  },
  {
    id: "7",
    name: "BookStore",
    displayName: "Sahaflar & Kırtasiyeler",
    icon: "book",
  },
  {
    id: "8",
    name: "Dorm",
    displayName: "Yurtlar",
    icon: "office-building",
  },
  {
    id: "5",
    name: "Sport",
    displayName: "Spor Yerleri",
    icon: "football",
  },
  {
    id: "6",
    name: "Hospital",
    displayName: "Hastaneler & Sağlık Ocakları",
    icon: "hospital-building",
  },
];

const markers = [
  {
    id: "m1",
    category: "Food",
    title: "Bartın Balık Restaurant",
    coordinate: { latitude: 41.6345, longitude: 32.3378 },
  },
  {
    id: "m2",
    category: "Cafe",
    title: "Köşe Kahve Evi",
    coordinate: { latitude: 41.6351, longitude: 32.3382 },
  },
  {
    id: "m3",
    category: "Faculties",
    title: "Bartın Üniversitesi Mühendislik Fakültesi",
    coordinate: { latitude: 41.6348, longitude: 32.3495 },
  },
  {
    id: "m4",
    category: "Library",
    title: "Bartın Üniversitesi Kütüphanesi",
    coordinate: { latitude: 41.6352, longitude: 32.3501 },
  },
  {
    id: "m5",
    category: "BookStore",
    title: "Bartın Kırtasiye",
    coordinate: { latitude: 41.636, longitude: 32.3387 },
  },
  {
    id: "m6",
    category: "Dorm",
    title: "Bartın KYK Öğrenci Yurdu",
    coordinate: { latitude: 41.6372, longitude: 32.3485 },
  },
  {
    id: "m7",
    category: "Sport",
    title: "Bartın Kapalı Spor Salonu",
    coordinate: { latitude: 41.6385, longitude: 32.341 },
  },
  {
    id: "m8",
    category: "Hospital",
    title: "Bartın Devlet Hastanesi",
    coordinate: { latitude: 41.6302, longitude: 32.3399 },
  },
];

const MarkerCard = ({ category, title }: MarkerCardProps) => {
  const { colors } = useTheme();
  return (
    <Card
      variant={"filled"}
      className="p-4 gap-2 rounded-lg "
      style={{
        backgroundColor: colors.border,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Heading size={"md"}> {title}</Heading>
    </Card>
  );
};

const MapScreen = () => {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState(mapFilters[0]);
  const filteredMarkers = markers.filter(
    (marker) => marker.category === selectedFilter.name
  );

  return (
    <Box className="flex-1 p-4 gap-4">
      <Box>
        <ScrollView
          horizontal
          contentContainerClassName="gap-4"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {mapFilters.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedFilter(item)}
            >
              <Badge
                className="gap-2 p-2 rounded-lg"
                style={{
                  backgroundColor:
                    selectedFilter.id === item.id
                      ? colors.primary
                      : colors.background,
                }}
              >
                <BadgeText
                  style={{
                    color:
                      item.id === selectedFilter.id
                        ? colors.background
                        : colors.primary,
                  }}
                  className="normal-case font-bold"
                >
                  {item.displayName}
                </BadgeText>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={16}
                  color={
                    selectedFilter.id === item.id
                      ? colors.background
                      : colors.primary
                  }
                  style={{ marginLeft: 4 }}
                />
              </Badge>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Box>
      <Box className="flex-[0.6]">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 39.0,
            longitude: 35.0,
            latitudeDelta: 10.0,
            longitudeDelta: 10.0,
          }}
        >
          <UrlTile
            urlTemplate="http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
            zIndex={-1}
          />
          {filteredMarkers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              pinColor={colors.primary}
            />
          ))}
        </MapView>
      </Box>
      <Box className="flex-[0.4">
        <FlatList
          data={filteredMarkers}
          renderItem={({ item }) => <MarkerCard {...item}></MarkerCard>}
        ></FlatList>
      </Box>
    </Box>
  );
};

export default MapScreen;
