import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Text } from "@/components/ui/text";
import NoData from "@/assets/images/no-data.svg";
import MarkerCard from "@/components/MarkerCard";
import { mapFilters, markers } from "@/mocks/mockData";
const MapScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState(mapFilters[0]);
  const filteredMarkers = markers.filter(
    (marker) => marker.category === selectedFilter.name
  );
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (filteredMarkers.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(
        filteredMarkers.map((marker) => marker.coordinate),
        {
          edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
          animated: true,
        }
      );

      setTimeout(() => {
        mapRef.current?.getCamera().then((camera) => {
          mapRef.current?.animateCamera(
            { zoom: camera.zoom },
            { duration: 1000 }
          );
        });
      }, 500);
    }
  }, [filteredMarkers]);

  return (
    <Box className="flex-1 p-4 gap-4">
      <Box>
        <ScrollView
          horizontal
          contentContainerClassName="gap-4"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {mapFilters.map((item) => {
            const isSelectedFilter = item.id === selectedFilter.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.5}
                onPress={() => setSelectedFilter(item)}
              >
                <Badge
                  className={`gap-2 p-2 rounded-xl ${isSelectedFilter ? "bg-primary-500 border-0" : " bg-transparent border rounded-xl"}`}
                >
                  <BadgeText
                    className={`normal-case font-bold ${isSelectedFilter ? "text-primary-0" : "text-typography-0"}`}
                  >
                    {item.displayName}
                  </BadgeText>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={16}
                    color={"white"}
                    style={{ marginLeft: 4 }}
                  />
                </Badge>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Box>
      <Box className="flex-[0.6]">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 39.0,
            longitude: 35.0,
            latitudeDelta: 10.0,
            longitudeDelta: 10.0,
          }}
        >
          <UrlTile
            urlTemplate="https://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
            zIndex={-1}
          />
          {filteredMarkers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              // pinColor={"white"}
            />
          ))}
        </MapView>
      </Box>
      <Box className="flex-[0.4]">
        <FlatList
          ListEmptyComponent={() => (
            <Box className="flex flex-col p-4 items-center gap-2 justify-center w-full">
              <NoData width={128} height={128} />
              <Text className=" text-typography-200">Konum bulunamadı</Text>
            </Box>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8, gap: 8, flexGrow: 1 }}
          keyExtractor={(item) => item.id}
          data={filteredMarkers}
          renderItem={({ item }) => <MarkerCard {...item}></MarkerCard>}
        />
      </Box>
    </Box>
  );
};

export default MapScreen;
