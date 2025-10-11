import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Box } from "@/components/ui/box";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import Logo from "@/assets/images/campuwise-logo-transparent.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
const CustomMainHeader = () => {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={["#0a7ea4", "#38bdf8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        height: 90,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "flex-end",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: Platform.OS === "android" ? 10 : 0,
      }}
    >
      <Box className="flex flex-row justify-between w-full items-center">
        <Logo width={160} />
        <Box className="flex-row gap-6 items-center">
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => console.log("Bell clicked")}
          >
            <MaterialCommunityIcons
              name="bell"
              size={24}
              color={colors.background}
            />
          </TouchableOpacity>
          <Avatar size="md">
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
            <AvatarBadge
              className="border-0 items-center justify-center flex"
              size={"lg"}
            >
              <Text>12</Text>
            </AvatarBadge>
          </Avatar>
        </Box>
      </Box>
    </LinearGradient>
  );
};

export default CustomMainHeader;
