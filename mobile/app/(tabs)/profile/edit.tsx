import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import AnimatedButton from "@/components/AnimatedButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { users } from "@/mocks/mockData";
import { editProfileFormSchema } from "@/validations/edit-profile-form";
import { Text } from "@/components/ui/text";
import showMessage from "@/utils/showMessage";
import pickImage from "@/utils/pickImage";
import { zodResolver } from "@hookform/resolvers/zod";

const EditProfileScreen = () => {
  const { email, fullName, phoneNumber, imageUrl } = users[0];

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
      imageUrl: imageUrl,
    },
    resolver: zodResolver(editProfileFormSchema),
  });

  const handleSave = async (data: any) => {
    console.log("Profile saved:", data);

    showMessage({
      type: "success",
      text1: "Profil Güncellendi 🎉",
      text2: "Bilgilerin başarıyla kaydedildi.",
    });
  };

  const handleChangeAvatar = async () => {
    const image = await pickImage({
      allowsEditing: true,
      aspect: [1, 1],
    });
    setValue("imageUrl", image?.uri);
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
            name="imageUrl"
            render={({ fieldState: { error }, field: { onChange, value } }) => (
              <>
                <Avatar size="2xl" className="mb-4">
                  <AvatarImage source={{ uri: value }} />
                </Avatar>
                <AnimatedButton onPress={handleChangeAvatar}>
                  Resim Ekle
                </AnimatedButton>
              </>
            )}
          ></Controller>
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
                    placeholder="Ad-Soyad"
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
                    placeholder="Telefon Numarası"
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
            onPress={handleSubmit(handleSave)}
            className="h-14"
            isDisabled={Object.keys(errors).length > 0}
          >
            Kaydet
          </AnimatedButton>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
