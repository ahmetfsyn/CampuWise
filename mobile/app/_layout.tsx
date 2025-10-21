import "@/configs/i18n.config";
import "react-native-reanimated";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DarkTheme, LightTheme } from "@/constants/customTheme";
import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import Toast from "react-native-toast-message";
import toastConfig from "@/configs/toast.config";
import SplashScreenUI from "@/components/SplashScreenUI";

export const unstable_settings = {
  initialRouteName: "auth",
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { isSplashVisible, theme, isAuthenticated } = useAppStore();
  const currentTheme = theme === "dark" ? DarkTheme : LightTheme;

  // Uygulama açılışı: initialize ve splash
  useEffect(() => {
    const initializeApp = async () => {
      const store = useAppStore.getState();
      await store.checkAuth(); // token kontrolü
      await store.initialize(); // didInitialize = true ve async işlemler
    };

    initializeApp();
  }, []);

  if (isSplashVisible) {
    return <SplashScreenUI />;
  }

  return (
    <ThemeProvider value={currentTheme}>
      <GluestackUIProvider mode={theme}>
        <Stack
          screenOptions={{
            animation: "fade",
            headerShown: false,
          }}
        >
          {!isAuthenticated ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="auth" />
          )}
        </Stack>
        <StatusBar style={"auto"} />
        <Toast config={toastConfig} />
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
