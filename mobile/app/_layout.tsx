import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "@/global.css";
import { DarkTheme, LightTheme } from "@/constants/customTheme";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const unstable_settings = {
  initialRouteName: "(auth)",
  anchor: "(tabs)",
};
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
      setShowSplash(false);
    };
    checkAuth();
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => {}} />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? LightTheme : DarkTheme}>
      <GluestackUIProvider mode={"system"}>
        <Stack screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="(auth)" />
          )}
        </Stack>
        <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
