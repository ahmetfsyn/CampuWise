import { useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import LightLogo from "@/assets/images/campuwise-logo-light-theme.svg";
import DarkLogo from "@/assets/images/campuwise-logo-transparent.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon, Icon } from "@/components/ui/icon";
import { useCallback, useState } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import useAppStore from "@/store/useAppStore";
import { Controller, useForm } from "react-hook-form";
import { loginFormSchema } from "@/validations/login-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SunMoon } from "lucide-react-native";
import showMessage from "@/utils/showMessage";

const LoginScreen = () => {
  const router = useRouter();
  const handleLogin = async () => {
    // backend'den token alındığını varsayalım
    // await AsyncStorage.setItem("token", "fake_token");
    showMessage({
      type: "success",
      text1: "Hoşgeldin 🎉",
      text2: "Seni tekrar görmek harika!",
    });
    router.replace("(tabs)");
    // todo: backend'den token alınacak

    console.log("Giriş yapıldı");
  };
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const handleNewAccount = () => {
    return router.push("/auth/register");
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(loginFormSchema),
  });

  const { theme, toggleTheme: handleToggleTheme } = useAppStore(
    (state) => state
  );

  const handleForgotPassword = useCallback(() => {
    console.log("i forgot password");
  }, []);

  // todo: formlar için keyboard avoidng ayarla

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerClassName="p-6 my-auto"
          showsVerticalScrollIndicator={false}
        >
          <Box className="flex items-end ">
            <AnimatedButton
              onPress={handleToggleTheme}
              variant={"solid"}
              icon={<Icon as={SunMoon} size={24} className="text-primary-0" />}
            />
          </Box>

          <Box className="flex items-center justify-center">
            {theme === "dark" ? (
              <DarkLogo width={256} />
            ) : (
              <LightLogo width={256} />
            )}
          </Box>

          <Box className="gap-4 ">
            <Box className="gap-2">
              <Text className="text-3xl font-bold text-typography-0">
                Seni Bekliyorduk 👋
              </Text>
              <Text className="text-lg font-normal text-typography-200">
                Bağlantı kurmak için giriş yap
              </Text>
            </Box>

            <Box className="gap-4">
              <Controller
                name="email"
                control={control}
                render={({
                  field: { onChange, value },
                  formState,
                  fieldState,
                }) => (
                  <>
                    <Input
                      variant="rounded"
                      size="xl"
                      isInvalid={errors.email ? true : false}
                    >
                      <InputField
                        placeholder="E-mail"
                        value={value}
                        onChangeText={onChange}
                      />
                    </Input>

                    {errors.email && (
                      <Box className="px-2">
                        <Text className="text-error-500">
                          {errors.email.message}
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({
                  field: { onChange, value },
                  formState,
                  fieldState,
                }) => (
                  <>
                    <Input
                      variant="rounded"
                      size="xl"
                      isInvalid={errors.password ? true : false}
                    >
                      <InputField
                        placeholder="Şifre"
                        value={value}
                        secureTextEntry
                        onChangeText={onChange}
                      />
                    </Input>
                    {errors.password && (
                      <Box className="px-2">
                        <Text className="text-error-500">
                          {errors.password.message}
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              />
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
                <CheckboxLabel>Beni Hatırla</CheckboxLabel>
              </Checkbox>

              <Button onPress={handleForgotPassword} variant="link" size={"md"}>
                <ButtonText className=" text-primary-500">
                  Şifremi Unuttum
                </ButtonText>
              </Button>
            </Box>

            <AnimatedButton
              onPress={handleSubmit(handleLogin)}
              size={"xl"}
              className="h-14 "
              isDisabled={Object.keys(errors).length > 0}
            >
              Giriş Yap
            </AnimatedButton>

            <Box className="flex-row gap-2 items-center justify-center">
              <Text className="text-typography-0">Hesabın yok mu ?</Text>
              <Button variant="link" onPress={handleNewAccount} size={"md"}>
                <ButtonText className=" text-primary-500">Kayıt Ol</ButtonText>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
