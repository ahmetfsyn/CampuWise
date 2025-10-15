import { Box } from "./ui/box";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { StyleSheet } from "react-native";
import { EventDeadLineCardProps } from "@/types/props";
import AnimatedPressableComponent from "./AnimatedPressable";
import { memo } from "react";
import { Icon } from "@/components/ui/icon";
import { MapPin, CalendarCheck, Clock } from "lucide-react-native";

const EventDeadLineCard = ({ place, title, date }: EventDeadLineCardProps) => {
  return (
    <AnimatedPressableComponent
      onPress={() => {
        console.log("Etkinlik önizleme modalı acıldı");
      }}
    >
      <Card
        variant={"outline"}
        className="bg-success-50 border-success-500  rounded-xl "
      >
        {/* Üst başlık alanı */}
        <Box className="flex-row items-center mb-2">
          <Icon as={CalendarCheck} className="text-typography-0" />

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
            <Icon as={Clock} className="text-typography-0" />

            <Text className=" text-typography-200">
              {date ? new Date(date).toLocaleDateString("tr-TR") : "Tarih Yok"}
            </Text>
          </Box>

          <Box className="flex-row items-center gap-1">
            <Icon as={MapPin} className="text-typography-0" />

            <Text className=" text-typography-200">
              {place || "Yer Belirtilmedi"}
            </Text>
          </Box>
        </Box>
      </Card>
    </AnimatedPressableComponent>
  );
};

const styles = StyleSheet.create({});

export default memo(EventDeadLineCard);
