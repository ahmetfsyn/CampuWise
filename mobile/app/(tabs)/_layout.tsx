import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import CustomTabBar from "@/components/CustomTabBar";
import { Box } from "@/components/ui/box";
import { Avatar } from "@/components/ui/avatar";
import Logo from "@/assets/images/campuwise-logo-transparent.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
      }}
      tabBar={(props) => <CustomTabBar {...props}></CustomTabBar>}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
          header: ({ layout, navigation, options, route }) => (
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
                <Avatar />
              </Box>
            </LinearGradient>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={24}
            ></MaterialCommunityIcons>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Harita",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={color}
              size={24}
            ></MaterialCommunityIcons>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Hesabım",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={24}
            ></MaterialCommunityIcons>
          ),
        }}
      />
    </Tabs>
  );
}
