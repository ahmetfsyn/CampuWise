import { Box } from "@/components/ui/box";
import { Event } from "@/types/models";
import { Image } from "expo-image";
import { Badge, BadgeText } from "@/components/ui/badge";
import { memo, useCallback, useEffect, useState } from "react";
import AnimatedPressableComponent from "./AnimatedPressable";

export type EventPreviewCardProps = Event & {
  onPress: () => void;
};

const EventPreviewCard = ({
  imageUrl,
  date,
  participants,
  onPress,
}: EventPreviewCardProps) => {
  const [remainDays, setRemainDays] = useState(-1);

  const getRemainingDays = useCallback(() => {
    if (!date) return null;
    const today = new Date();
    const eventDate = new Date(date);

    // Gün farkını hesapla
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays);
    setRemainDays(diffDays);
  }, [date]);

  console.log("render oldu");

  useEffect(() => {
    getRemainingDays();
  }, [getRemainingDays]);

  return (
    <AnimatedPressableComponent onPress={onPress}>
      <Box
        style={{
          width: 192,
          aspectRatio: 1,
          borderRadius: 12,
          marginRight: 12,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: imageUrl || "https://picsum.photos/200/200" }}
          style={{
            width: "100%",
            height: "100%",
          }}
          contentFit="cover"
        />
        <Box className="absolute flex-row gap-2 top-2 left-2 flex-wrap">
          {remainDays <= 2 && (
            <Badge size={"md"} className="rounded-full  bg-yellow-600/75">
              <BadgeText>{remainDays + " gün kaldı"}</BadgeText>
            </Badge>
          )}
          <Badge size={"md"} className="rounded-full bg-blue-600/75">
            <BadgeText>{participants.length + " kişi katıldı"}</BadgeText>
          </Badge>
        </Box>
      </Box>
    </AnimatedPressableComponent>
  );
};

export default memo(EventPreviewCard);
