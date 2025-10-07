import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import LightLogo from "@/assets/images/campuwise-logo-light-theme.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { useTheme } from "@react-navigation/native";
import { useCallback } from "react";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const handleRegister = useCallback(() => {
    console.log("kayıt oldu");
    router.push("/(tabs)");
  }, []);

  const handleAlreadyHaveAnAccount = useCallback(() => {
    return router.push("/(auth)/login");
  }, []);

  return (
    <SafeAreaView
      className="p-6 flex justify-center"
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <Box className="flex items-center flex-[0.25]   justify-center">
        <LightLogo width={256}></LightLogo>
      </Box>

      <Box className="gap-4 flex-[0.75] ">
        <Box className="gap-2">
          <Text className="text-3xl font-bold" style={{ color: colors.text }}>
            Buralarda Yeniysen 👋
          </Text>
          <Text
            className="text-lg font-normal"
            style={{ color: colors.secondary }}
          >
            Kayıt ol ve aramıza katıl
          </Text>
        </Box>

        <Box className="gap-4">
          <Input
            variant="rounded"
            size="xl"
            id="fullName"
            className="h-16 rounded-xl"
            style={{
              borderColor: colors.border,
            }}
          >
            <InputField placeholder="Ad-Soyad" style={{ color: colors.text }} />
          </Input>
          <Input
            variant="rounded"
            size="xl"
            id="email"
            className="h-16 rounded-xl"
            style={{
              borderColor: colors.border,
            }}
          >
            <InputField placeholder="E-mail" style={{ color: colors.text }} />
          </Input>
          <Input
            variant="rounded"
            className="h-16 rounded-xl"
            id="password"
            size="xl"
            style={{
              borderColor: colors.border,
            }}
          >
            <InputField placeholder="Şifre" style={{ color: colors.text }} />
          </Input>
          <Input
            id="repeatPassword"
            variant="rounded"
            className="h-16 rounded-xl"
            size="xl"
            style={{
              borderColor: colors.border,
            }}
          >
            <InputField
              placeholder="Şifre Tekrar"
              style={{ color: colors.text }}
            />
          </Input>
        </Box>

        <Button
          onPress={handleRegister}
          size={"xl"}
          className="rounded-xl h-16"
          style={{
            backgroundColor: colors.primary,
          }}
        >
          <ButtonText style={{ color: colors.background }}>Kayıt Ol</ButtonText>
        </Button>

        <Box className="flex-row gap-2 items-center justify-center">
          <Text style={{ color: colors.text }}>Zaten bir hesabın var mı ?</Text>

          <Button
            variant="link"
            onPress={handleAlreadyHaveAnAccount}
            size={"md"}
          >
            <ButtonText style={{ color: colors.primary }}>Giriş Yap</ButtonText>
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default RegisterScreen;
