import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import CustomTabBar from "@/components/CustomTabBar";
import { Box } from "@/components/ui/box";
import { Avatar } from "@/components/ui/avatar";
import Logo from "@/assets/images/campuwise-logo-transparent.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Text } from "@/components/ui/text";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: ({ navigation, options }) => {
          const title = options.title ?? options.tabBarLabel ?? options.name;

          return (
            <View
              style={{
                backgroundColor: colors.primary,
                height: 90,
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 30, // status bar boşluğu
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
              className="rounded-b-[32px]"
            >
              {/* Geri Butonu */}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                disabled={!navigation.canGoBack()}
                style={{
                  opacity: navigation.canGoBack() ? 1 : 0,
                  padding: 4,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color={colors.background}
                />
              </TouchableOpacity>

              {/* Başlık */}
              <Text
                style={{
                  color: colors.background,
                  fontSize: 20,
                  fontWeight: "600",
                  textAlign: "center",
                  flex: 1,
                }}
                numberOfLines={1}
              >
                {title}
              </Text>

              {/* Sağ boşluk (geri tuşu hizası için) */}
              <View style={{ width: 28 }} />
            </View>
          );
        },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
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
