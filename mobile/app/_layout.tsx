import "react-native-reanimated";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "@/global.css";
import { DarkTheme, LightTheme } from "@/constants/customTheme";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAppStore from "@/store/useAppStore";

export const unstable_settings = {
  initialRouteName: "auth",
  anchor: "(tabs)",
};
export default function RootLayout() {
  const colorScheme = useAppStore((state) => state.theme);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [showSplash, setShowSplash] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(false);
      setShowSplash(false);
    };
    checkAuth();
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => {}} />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <GluestackUIProvider mode={colorScheme}>
        <Stack
          screenOptions={{
            animation: "none",
            headerShown: false,
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="auth" />
          )}
        </Stack>
        <StatusBar style={"auto"} />
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
