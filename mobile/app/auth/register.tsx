import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import LightLogo from "@/assets/images/campuwise-logo-light-theme.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { useTheme } from "@react-navigation/native";
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { registerFormSchema } from "@/validations/register-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AnimatedButton from "@/components/AnimatedButton";

const RegisterScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const handleRegister = useCallback(() => {
    console.log("kayıt oldu");
    // router.push("/(tabs)/(home)");
  }, [router]);

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
          <Controller
            control={control}
            name="fullName"
            render={() => (
              <Input
                variant="rounded"
                size="xl"
                className="h-14 rounded-xl"
                style={{
                  borderColor: colors.border,
                }}
              >
                <InputField
                  placeholder="Ad-Soyad"
                  style={{ color: colors.text }}
                />
              </Input>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={() => (
              <Input
                variant="rounded"
                size="xl"
                className="h-14 rounded-xl"
                style={{
                  borderColor: colors.border,
                }}
              >
                <InputField
                  placeholder="E-mail"
                  style={{ color: colors.text }}
                />
              </Input>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={() => (
              <Input
                variant="rounded"
                className="h-14 rounded-xl"
                size="xl"
                style={{
                  borderColor: colors.border,
                }}
              >
                <InputField
                  placeholder="Şifre"
                  style={{ color: colors.text }}
                />
              </Input>
            )}
          />

          <Controller
            control={control}
            name="repeatPassword"
            render={() => (
              <Input
                variant="rounded"
                className="h-14 rounded-xl"
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
            )}
          />
        </Box>

        <AnimatedButton
          onPress={handleSubmit(handleRegister)}
          size={"xl"}
          isDisabled={Object.keys(errors).length > 0}
          className="rounded-xl h-14"
          style={{
            backgroundColor: colors.primary,
          }}
        >
          Kayıt Ol
        </AnimatedButton>

        <Box className="flex-row gap-2 items-center justify-center">
          <Text style={{ color: colors.text }}>Zaten bir hesabın var mı ?</Text>

          <AnimatedButton
            variant="link"
            onPress={handleAlreadyHaveAnAccount}
            size={"md"}
          >
            <Text style={{ color: colors.primary }}>Giriş Yap</Text>
          </AnimatedButton>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default RegisterScreen;
