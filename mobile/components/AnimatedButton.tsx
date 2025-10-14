import { Button, ButtonText } from "@/components/ui/button";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import React, { memo } from "react";
import { Box } from "./ui/box";

const AnimatedGluestackButton = Animated.createAnimatedComponent(Button);

export type AnimatedButtonProps = {
  children?: React.ReactNode;
  onPress: () => void;
  style?: object;
  textClassName?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
} & React.ComponentProps<typeof Button>;

const AnimatedButton = ({
  children,
  onPress,
  textClassName,
  style,
  icon,
  iconPosition = "left",
  className = "",
  ...props
}: AnimatedButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedGluestackButton
      onPressIn={() => {
        scale.value = withSpring(0.95);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
      style={[
        animatedStyle,
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      className={`rounded-xl  ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <Box className={children ? "mr-2" : ""}>{icon}</Box>
      )}

      {children && (
        <ButtonText className={`${textClassName || ""} text-primary-0`}>
          {children}
        </ButtonText>
      )}

      {icon && iconPosition === "right" && children && (
        <Box className="ml-2">{icon}</Box>
      )}
    </AnimatedGluestackButton>
  );
};

export default memo(AnimatedButton);
