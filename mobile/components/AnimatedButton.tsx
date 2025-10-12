import { Button, ButtonText } from "@/components/ui/button";
import { useTheme } from "@react-navigation/native";
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
  buttonClassName?: string;
  textClassName?: string;
  icon?: React.ReactNode; // 🔹 opsiyonel ikon
  iconPosition?: "left" | "right"; // 🔹 ikon konumu
} & React.ComponentProps<typeof Button>;

const AnimatedButton = ({
  children,
  onPress,
  buttonClassName,
  textClassName,
  style,
  icon,
  iconPosition = "left",
  ...props
}: AnimatedButtonProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    ...style,
  }));

  return (
    <AnimatedGluestackButton
      onPressIn={() => {
        scale.value = withSpring(0.95);
        opacity.value = withSpring(0.8);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
        opacity.value = withSpring(1);
      }}
      onPress={onPress}
      style={[
        animatedStyle,
        {
          flexDirection: "row",
          justifyContent: "center", // 🔹 Her durumda ortala
          alignItems: "center",
        },
      ]}
      className={buttonClassName}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <Box className={children ? "mr-2" : ""}>{icon}</Box>
      )}
      {children && (
        <ButtonText
          className={textClassName}
          style={{ color: colors.background }}
        >
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
