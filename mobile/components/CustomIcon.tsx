import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "nativewind";

type CustomIconProps = {
  name: string;
  size?: number;
  colorKey?: string; // theme renk değişkeni
};

const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  size = 24,
  colorKey = "typography-500",
}) => {
  const { colors } = useTheme();

  return (
    <View>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={`rgb(${colors[colorKey]})`} // theme renk key’den alınıyor
      />
    </View>
  );
};

export default CustomIcon;
