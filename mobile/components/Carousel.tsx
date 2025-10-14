import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { Box } from "./ui/box";

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width - 32; // paddingLeft + paddingRight

const CustomCarousel = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const { colors } = useTheme();
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <Box>
      <Carousel
        ref={ref}
        width={width}
        height={width / 2}
        data={data}
        autoPlay
        scrollAnimationDuration={2000}
        autoPlayInterval={3500}
        onProgressChange={progress}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              marginRight: 8,
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: `https://picsum.photos/1280/720?random=${index}` }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "gray", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </Box>
  );
};

export default React.memo(CustomCarousel);
