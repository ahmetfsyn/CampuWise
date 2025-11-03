import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import LightLogo from "@/assets/images/campuwise-logo-light-theme.svg";
import DarkLogo from "@/assets/images/campuwise-logo-transparent.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  registerFormSchema,
  RegisterFormValues,
} from "@/validations/register-form";
import AnimatedButton from "@/components/AnimatedButton";
import useAppStore from "@/store/useAppStore";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import useRegister from "@/hooks/auth/useRegister";

const RegisterScreen = () => {
  const router = useRouter();

  const { t } = useTranslation("auth");

  const { handleRegister, isRegistering } = useRegister();

  const onSubmit = async (values: RegisterFormValues) => {
    await handleRegister(values);
    return router.push("/auth/login");
  };

  const { theme } = useAppStore((state) => state);
  const handleAlreadyHaveAnAccount = useCallback(() => {
    return router.push("/auth/login");
  }, [router]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      repeatPassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerClassName="p-6"
          showsVerticalScrollIndicator={false}
        >
          <Box className="flex-1 h-64 items-center justify-center ">
            {theme === "dark" ? (
              <DarkLogo width={256} />
            ) : (
              <LightLogo width={256} />
            )}
          </Box>

          <Box className="gap-4">
            <Box className="gap-2 mb-4">
              <Text className="text-3xl font-bold text-typography-0">
                {t("register.title")}
              </Text>
              <Text className="text-lg font-normal text-typography-200">
                {t("register.subtitle")}
              </Text>
            </Box>

            <Box className="gap-4 mb-4">
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      variant="rounded"
                      isInvalid={errors.fullName ? true : false}
                      size="lg"
                    >
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        placeholder={t("register.fullNamePlaceholder")}
                        keyboardType="default"
                      />
                    </Input>
                    {errors.fullName && (
                      <Box className="px-2">
                        <Text className="text-error-500">
                          {t(errors.fullName.message as string)}
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      variant="rounded"
                      isInvalid={errors.email ? true : false}
                      size="lg"
                    >
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        placeholder={t("register.emailPlaceholder")}
                        keyboardType="email-address"
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
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      variant="rounded"
                      isInvalid={errors.password ? true : false}
                      size="lg"
                    >
                      <InputField
                        type="password"
                        secureTextEntry
                        textContentType="password"
                        value={value}
                        onChangeText={onChange}
                        placeholder={t("register.passwordPlaceholder")}
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

              <Controller
                control={control}
                name="repeatPassword"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      variant="rounded"
                      isInvalid={errors.repeatPassword ? true : false}
                      size="lg"
                    >
                      <InputField
                        value={value}
                        secureTextEntry
                        onChangeText={onChange}
                        placeholder={t("register.repeatPasswordPlaceholder")}
                      />
                    </Input>
                    {errors.repeatPassword && (
                      <Box className="px-2">
                        <Text className="text-error-500">
                          {t(errors.repeatPassword.message as string)}
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              />
            </Box>

            <AnimatedButton
              onPress={handleSubmit(onSubmit)}
              size={"xl"}
              className="h-14 mb-4"
              isDisabled={!isValid || isRegistering}
            >
              {isRegistering ? (
                <ButtonSpinner className="text-primary-0" size={24} />
              ) : (
                t("register.registerButton")
              )}
            </AnimatedButton>

            <Box className="flex-row gap-2 items-center justify-center">
              <Text className="text-typography-0">
                {t("register.alreadyHaveAccount")}
              </Text>

              <Button
                variant="link"
                onPress={handleAlreadyHaveAnAccount}
                size={"md"}
                isDisabled={isRegistering}
              >
                <ButtonText className="text-primary-500">
                  {t("register.loginButton")}
                </ButtonText>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
