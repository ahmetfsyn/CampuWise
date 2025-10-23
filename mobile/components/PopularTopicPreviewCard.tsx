import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "./ui/text";
import { memo } from "react";
import { Box } from "./ui/box";
import AnimatedPressableComponent from "./AnimatedPressable";
import { useTranslation } from "react-i18next";

export type PopularTopicPreviewCardProps = {
  description: string;
  name: string;
  imageUrl?: string;
  onPress?: () => void;
};

const PopularTopicPreviewCard = ({
  name,
  imageUrl,
  onPress,
}: PopularTopicPreviewCardProps) => {
  const { t } = useTranslation("home");
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
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: "100%",
          }}
          contentFit="cover"
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(0,0,0,0.175)" },
          ]}
        />
        <Box className="absolute flex items-center justify-center w-full h-full p-2">
          <Text
            className="font-semibold text-2xl text-center flex-wrap text-primary-0"
            numberOfLines={2}
          >
            {t(`popularTopics.${name}`)}
          </Text>
        </Box>
      </Box>
    </AnimatedPressableComponent>
  );
};

export default memo(PopularTopicPreviewCard);

const styles = StyleSheet.create({});
