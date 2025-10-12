import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomTabBar from "@/components/CustomTabBar";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Text } from "@/components/ui/text";
import CustomMainHeader from "@/components/CustomMainHeader";
import CustomInnerHeader from "@/components/CustomInnerHeader";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Harita",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
