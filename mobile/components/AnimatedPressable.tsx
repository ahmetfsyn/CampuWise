import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export type AnimatedPressable = {
  children: React.ReactNode;
  onPress: () => void;
};

const AnimatedPressableComponent = ({
  children,
  onPress,
}: AnimatedPressable) => {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1); // varsayılan boyut

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      style={[animatedStyle]}
      onPressIn={() => {
        scale.value = withSpring(0.95);
        opacity.value = withSpring(0.8);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
        opacity.value = withSpring(1);
      }}
      onPress={onPress}
    >
      {children}
    </AnimatedPressable>
  );
};

export default memo(AnimatedPressableComponent);

const styles = StyleSheet.create({});
