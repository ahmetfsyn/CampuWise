import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import AnimatedButton from "@/components/AnimatedButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@react-navigation/native";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { users } from "@/mocks/mockData";
import { editProfileFormSchema } from "@/validations/edit-profile-form";
import { Text } from "@/components/ui/text";

const EditProfileScreen = () => {
  const { colors } = useTheme();
  const { email, fullName, phoneNumber, imageUrl } = users[0];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
    },
    resolver: yupResolver(editProfileFormSchema),
  });

  const handleSave = (data: any) => {
    console.log("Profile saved:", data);
  };

  const handleChangeAvatar = () => {
    console.log("Change Avatar pressed");
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
          <Avatar size="2xl" className="mb-3">
            <AvatarImage source={{ uri: imageUrl }} />
          </Avatar>
          <AnimatedButton size={"md"} onPress={handleChangeAvatar}>
            Resim Ekle
          </AnimatedButton>
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
            textClassName="font-semibold"
            disabled={Object.keys(errors).length > 0 ? true : false}
          >
            Kaydet
          </AnimatedButton>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
