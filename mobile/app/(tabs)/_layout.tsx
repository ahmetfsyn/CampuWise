import { Tabs } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar";
import CustomInnerHeader from "@/components/CustomInnerHeader";
import { Icon } from "@/components/ui/icon";
import { Home, MapPin, User2 } from "lucide-react-native";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
        animation: "none",
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              as={Home}
              size={24}
              className={
                focused ? "text-typography-900" : "text-typography-200"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          header: (props) => <CustomInnerHeader {...props} />,
          title: "map",
          tabBarIcon: ({ focused }) => (
            <Icon
              as={MapPin}
              size={24}
              className={
                focused ? "text-typography-900" : "text-typography-200"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "profile",
          tabBarIcon: ({ focused }) => (
            <Icon
              as={User2}
              size={24}
              className={
                focused ? "text-typography-900" : "text-typography-200"
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
