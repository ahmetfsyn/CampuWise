import { Box } from "./ui/box";
import { Card } from "./ui/card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { StyleSheet } from "react-native";
import { EventDeadLineCardProps } from "@/types/props";
import AnimatedPressableComponent from "./AnimatedPressable";
import { memo } from "react";

const EventDeadLineCard = ({ place, title, date }: EventDeadLineCardProps) => {
  return (
    <AnimatedPressableComponent
      onPress={() => {
        console.log("Etkinlik önizleme modalı acıldı");
      }}
    >
      <Box className="">
        <Card style={styles.card}>
          {/* Üst başlık alanı */}
          <Box className="flex-row items-center mb-2">
            <MaterialCommunityIcons
              name="calendar-clock"
              size={22}
              color={"white"}
            />
            <Heading className="ml-2 text-lg font-semibold text-success-500">
              Etkinlik Başlıyor
            </Heading>
          </Box>

          {/* Etkinlik Başlığı */}
          <Heading
            className="text-xl font-medium mb-1 text-typography-0"
            numberOfLines={1}
          >
            {title || "Etkinlik Adı"}
          </Heading>

          {/* Tarih ve Yer Bilgisi */}
          <Box className="flex-row items-center justify-between mt-1">
            <Box className="flex-row items-center gap-1">
              <MaterialCommunityIcons
                name="clock-outline"
                size={18}
                color={"white"}
              />
              <Text className=" text-typography-200">
                {date
                  ? new Date(date).toLocaleDateString("tr-TR")
                  : "Tarih Yok"}
              </Text>
            </Box>

            <Box className="flex-row items-center gap-1">
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={18}
                color={"white"}
              />
              <Text className=" text-typography-200">
                {place || "Yer Belirtilmedi"}
              </Text>
            </Box>
          </Box>
        </Card>
      </Box>
    </AnimatedPressableComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: "#00FFAA",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3, // Android glow
  },
});

export default memo(EventDeadLineCard);
