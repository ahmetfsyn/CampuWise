import "@/configs/i18n.config";
import "react-native-reanimated";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeProvider, useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DarkTheme, LightTheme } from "@/constants/customTheme";
import useAppStore from "@/store/useAppStore";
import Toast from "react-native-toast-message";
import toastConfig from "@/configs/toast.config";
import SplashScreenUI from "@/components/SplashScreenUI";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: "auth",
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { isSplashVisible, theme, initialize } = useAppStore();
  const { isAuthenticated, checkAuth, user } = useAuthStore();
  const currentTheme = theme === "dark" ? DarkTheme : LightTheme;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const setupApp = async () => {
      await initialize();
      await checkAuth();
      setReady(true);
    };
    setupApp();
  }, []);

  if (isSplashVisible || !ready) {
    return <SplashScreenUI />;
  }

  return (
    <ThemeProvider value={currentTheme}>
      <GluestackUIProvider mode={theme}>
        <QueryClientProvider client={queryClient}>
          <Box className="flex-1 bg-background-0">
            <Stack
              screenOptions={{
                animation: "none",
                headerShown: false,
                animationDuration: 300,
              }}
            >
              <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(tabs)" />
              </Stack.Protected>
              <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="auth" />
              </Stack.Protected>
            </Stack>
          </Box>
          <StatusBar style={"auto"} />
          <Toast config={toastConfig} />
        </QueryClientProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
