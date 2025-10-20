import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import LightLogo from "@/assets/images/campuwise-logo-light-theme.svg";
import DarkLogo from "@/assets/images/campuwise-logo-transparent.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { registerFormSchema } from "@/validations/register-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AnimatedButton from "@/components/AnimatedButton";
import useAppStore from "@/store/useAppStore";
import { Button, ButtonText } from "@/components/ui/button";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import showMessage from "@/utils/showMessage";

const RegisterScreen = () => {
  const router = useRouter();
  const handleRegister = useCallback(() => {
    console.log("kayıt oldu");

    showMessage({
      type: "success",
      text1: "Kayıt Başarılı 🎉",
      text2: "Aramıza hoş geldin!",
    });
    // router.push("/(tabs)/(home)");
  }, [router]);
  const { theme, toggleTheme: handleToggleTheme } = useAppStore(
    (state) => state
  );
  const handleAlreadyHaveAnAccount = useCallback(() => {
    return router.push("/auth/login");
  }, [router]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(registerFormSchema),
  });

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
          <Box className="flex items-center justify-center mb-6">
            {theme === "dark" ? (
              <DarkLogo width={256} />
            ) : (
              <LightLogo width={256} />
            )}
          </Box>

          <Box className="gap-4">
            <Box className="gap-2 mb-4">
              <Text className="text-3xl font-bold text-typography-0">
                Buralarda Yeniysen 👋
              </Text>
              <Text className="text-lg font-normal text-typography-200">
                Kayıt ol ve aramıza katıl
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
                        placeholder="Ad-Soyad"
                        keyboardType="default"
                      />
                    </Input>
                    {errors.fullName && (
                      <Box className="px-2">
                        <Text className="text-error-300">
                          {errors.fullName.message}
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
                        placeholder="Email"
                        keyboardType="email-address"
                      />
                    </Input>
                    {errors.email && (
                      <Box className="px-2">
                        <Text className="text-error-300">
                          {errors.email.message}
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
                        placeholder="Şifre"
                      />
                    </Input>
                    {errors.password && (
                      <Box className="px-2">
                        <Text className="text-error-300">
                          {errors.password.message}
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
                        placeholder="Tekrar Şifre"
                      />
                    </Input>
                    {errors.repeatPassword && (
                      <Box className="px-2">
                        <Text className="text-error-300">
                          {errors.repeatPassword.message}
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              />
            </Box>

            <AnimatedButton
              onPress={handleSubmit(handleRegister)}
              size={"xl"}
              className="h-14 mb-4"
              isDisabled={Object.keys(errors).length > 0}
            >
              Kayıt Ol
            </AnimatedButton>

            <Box className="flex-row gap-2 items-center justify-center">
              <Text className="text-typography-0">
                Zaten bir hesabın var mı ?
              </Text>

              <Button
                variant="link"
                onPress={handleAlreadyHaveAnAccount}
                size={"md"}
              >
                <ButtonText className="text-primary-500">Giriş Yap</ButtonText>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
