import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import LightLogo from "@/assets/images/campuwise-logo-light-theme.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { Input, InputField } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { useState } from "react";

const LoginScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const handleLogin = async () => {
    // backend'den token alındığını varsayalım
    await AsyncStorage.setItem("token", "fake_token");
    router.replace("(tabs)");
  };
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const handleNewAccount = () => {
    return router.push("/(auth)/register");
  };
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
            Seni Bekliyorduk 👋
          </Text>
          <Text
            className="text-lg font-normal"
            style={{ color: colors.secondary }}
          >
            Bağlantı kurmak için giriş yap
          </Text>
        </Box>

        <Box className="gap-4">
          <Input
            variant="rounded"
            size="xl"
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
            size="xl"
            style={{
              borderColor: colors.border,
            }}
          >
            <InputField placeholder="Şifre" style={{ color: colors.text }} />
          </Input>
        </Box>

        <Box className="flex-row justify-between items-center">
          <Checkbox
            isDisabled={false}
            isInvalid={false}
            size="md"
            value={rememberMe}
            onValueChange={(val: boolean) => setRememberMe(val)}
            className="flex-row items-center gap-2"
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel style={{ color: colors.text }}>
              Beni Hatırla
            </CheckboxLabel>
          </Checkbox>

          <Button variant="link" size={"md"}>
            <ButtonText style={{ color: colors.primary }}>
              Şifremi Unuttum
            </ButtonText>
          </Button>
        </Box>

        <Button
          onPress={handleLogin}
          size={"xl"}
          className="rounded-xl h-16"
          style={{
            backgroundColor: colors.primary,
          }}
        >
          <ButtonText style={{ color: colors.background }}>
            Giriş Yap
          </ButtonText>
        </Button>

        <Box className="flex-row gap-2 items-center justify-center">
          <Text style={{ color: colors.text }}>Hesabın yok mu ?</Text>
          <Button variant="link" onPress={handleNewAccount} size={"md"}>
            <ButtonText style={{ color: colors.primary }}>Kayıt Ol</ButtonText>
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
