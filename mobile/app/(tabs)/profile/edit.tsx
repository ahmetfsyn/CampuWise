import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import AnimatedButton from "@/components/AnimatedButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { editProfileFormSchema } from "@/validations/edit-profile-form";
import { Text } from "@/components/ui/text";
import showMessage from "@/utils/showMessage";
import pickImage from "@/utils/pickImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import useUserStore from "@/store/useUserStore";

const EditProfileScreen = () => {
  const { email, fullName, id, avatarUrl, phoneNumber } = useUserStore(
    (state) => state.user!
  );

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      avatarUrl: avatarUrl,
    },
    resolver: zodResolver(editProfileFormSchema),
  });
  const { t } = useTranslation("profile");

  const onSubmit = async (data: any) => {
    await handleSave(data);
  };

  const handleSave = async (data: any) => {
    console.log("Profile saved:", data);

    showMessage({
      type: "success",
      text1: t("editProfile.toast.successTitle"),
      text2: t("editProfile.toast.successMessage"),
    });
  };

  const handleChangeAvatar = async () => {
    const image = await pickImage({
      allowsEditing: true,
      aspect: [1, 1],
    });
    setValue("avatarUrl", image?.uri);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerClassName="p-6"
        showsVerticalScrollIndicator={false}
      >
        <Box className="items-center mb-6">
          <Controller
            control={control}
            name="avatarUrl"
            render={({ fieldState: { error }, field: { onChange, value } }) => (
              <>
                <Avatar size="2xl" className="mb-4">
                  <AvatarImage source={{ uri: value }} />
                </Avatar>
                <AnimatedButton onPress={handleChangeAvatar}>
                  {t("editProfile.addPhoto")}
                </AnimatedButton>
              </>
            )}
          />
        </Box>

        <Box className="gap-4">
          {/* Name */}
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
                    placeholder={t("editProfile.placeholders.fullName")}
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

          {/* Email */}
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
                    placeholder={t("editProfile.placeholders.email")}
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

          {/* Phone */}
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  variant="rounded"
                  size="lg"
                  isInvalid={errors.phoneNumber ? true : false}
                >
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    placeholder={t("editProfile.placeholders.phone")}
                    maxLength={10}
                    keyboardType="phone-pad"
                  />
                </Input>
                {errors.phoneNumber && (
                  <Box className="px-2">
                    <Text className="text-error-300">
                      {errors.phoneNumber.message}
                    </Text>
                  </Box>
                )}
              </>
            )}
          />

          <AnimatedButton
            size={"lg"}
            onPress={handleSubmit(onSubmit)}
            className="h-14"
            isDisabled={Object.keys(errors).length > 0}
          >
            {t("editProfile.saveButton")}
          </AnimatedButton>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
