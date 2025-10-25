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
import { useCallback } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import useAppStore from "@/store/useAppStore";
import { Controller, useForm } from "react-hook-form";
import { loginFormSchema } from "@/validations/login-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SunMoon } from "lucide-react-native";
import showMessage from "@/utils/showMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const LoginScreen = () => {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const handleLogin = async (data: any) => {
    // backend'den token alındığını varsayalım
    await useAppStore.getState().login("authToken");

    showMessage({
      type: "success",
      text1: "Hoşgeldin 🎉",
      text2: "Seni tekrar görmek harika!",
    });
    router.replace("(tabs)");
    // todo: backend'den token alınacak

    console.log("Giriş yapıldı");
  };
  const handleNewAccount = () => {
    return router.push("/auth/register");
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginFormSchema),
  });

  const { theme, toggleTheme: handleToggleTheme } = useAppStore(
    (state) => state
  );

  const handleForgotPassword = useCallback(() => {
    console.log("i forgot password");
  }, []);

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
                {t("login.title")}
              </Text>
              <Text className="text-lg font-normal text-typography-200">
                {t("login.subtitle")}
              </Text>
            </Box>

            <Box className="gap-4">
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      variant="rounded"
                      size="xl"
                      isInvalid={errors.email ? true : false}
                    >
                      <InputField
                        placeholder={t("login.email")}
                        value={value}
                        onChangeText={onChange}
                      />
                    </Input>

                    {errors.email && (
                      <Box className="px-2">
                        <Text className="text-error-500">
                          {t(errors.email.message)}
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      variant="rounded"
                      size="xl"
                      isInvalid={errors.password ? true : false}
                    >
                      <InputField
                        placeholder={t("login.password")}
                        value={value}
                        secureTextEntry
                        onChangeText={onChange}
                      />
                    </Input>
                    {errors.password && (
                      <Box className="px-2">
                        <Text className="text-error-500">
                          {t(errors.password.message)}
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              />
            </Box>

            <Box className="flex-row justify-between items-center">
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    isChecked={!!value}
                    onChange={(isSelected) => onChange(isSelected)}
                    value="rememberMe"
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>{t("login.rememberMe")}</CheckboxLabel>
                  </Checkbox>
                )}
              />

              <Button onPress={handleForgotPassword} variant="link" size={"md"}>
                <ButtonText className=" text-primary-500">
                  {t("login.forgotPassword")}
                </ButtonText>
              </Button>
            </Box>

            <AnimatedButton
              onPress={handleSubmit(handleLogin)}
              size={"xl"}
              className="h-14 "
              isDisabled={Object.keys(errors).length > 0}
            >
              {t("login.loginButton")}
            </AnimatedButton>

            <Box className="flex-row gap-2 items-center justify-center">
              <Text className="text-typography-0">{t("login.noAccount")}</Text>
              <Button variant="link" onPress={handleNewAccount} size={"md"}>
                <ButtonText className=" text-primary-500">
                  {t("login.register")}
                </ButtonText>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
