import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "./ui/text";
import { memo } from "react";
import { Box } from "./ui/box";
import { useTheme } from "@react-navigation/native";
import AnimatedPressableComponent from "./AnimatedPressable";

export type PopularTopicPreviewCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  onPress?: () => void;
};

const PopularTopicPreviewCard = ({
  title,
  description,
  imageUrl,
  onPress,
}: PopularTopicPreviewCardProps) => {
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
            {title}
          </Text>
        </Box>
      </Box>
    </AnimatedPressableComponent>
  );
};

export default memo(PopularTopicPreviewCard);

const styles = StyleSheet.create({});
