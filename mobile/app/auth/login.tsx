import { useRouter } from "expo-router";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
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
import { CheckIcon } from "@/components/ui/icon";
import { useCallback } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import useAppStore from "@/store/useAppStore";
import { Controller, useForm } from "react-hook-form";
import { loginFormSchema, LoginFormValues } from "@/validations/login-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import useLogin from "@/hooks/auth/useLogin";
import useUserStore from "@/store/useUserStore";
import { getCurrentUserAsync } from "@/services/user.service";
const LoginScreen = () => {
  const router = useRouter();
  const { t } = useTranslation("auth");

  const { handleLogin, isLogining } = useLogin();

  const onSubmit = async (values: LoginFormValues) => {
    await handleLogin(values);
  };

  const handleNewAccount = () => {
    return router.push("/auth/register");
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const { theme } = useAppStore((state) => state);

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
          contentContainerClassName="p-6 "
          showsVerticalScrollIndicator={false}
        >
          <Box className="flex-1 items-center h-64 justify-center ">
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
                          {t(errors.email.message as string)}
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
                          {t(errors.password.message as string)}
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
              onPress={handleSubmit(onSubmit)}
              size={"xl"}
              className="h-14 "
              isDisabled={!isValid || isLogining}
            >
              {isLogining ? (
                <ButtonSpinner className="text-primary-0" size={24} />
              ) : (
                t("login.loginButton")
              )}
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
