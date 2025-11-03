import { Stack } from "expo-router";

export default function AuthLayout() {
  // const { isAuthenticated, user } = useAuthStore();

  // Eğer login değilse auth stack'i göster
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
