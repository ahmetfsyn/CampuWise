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

  const scale = useSharedValue(1); // varsayılan boyut

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[animatedStyle]}
      onPressIn={() => {
        scale.value = withSpring(0.95, { stiffness: 200, damping: 15 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { stiffness: 200, damping: 15 });
      }}
      onPress={onPress}
    >
      {children}
    </AnimatedPressable>
  );
};

export default memo(AnimatedPressableComponent);

const styles = StyleSheet.create({});
