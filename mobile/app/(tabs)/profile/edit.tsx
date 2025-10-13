import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import AnimatedButton from "@/components/AnimatedButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { users } from "@/mocks/mockData";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";

const EditProfileScreen = () => {
  const { colors } = useTheme();

  const user = users[0];

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);

  const handleSave = () => {
    console.log("Profile saved:", { name, email, phone, imageUrl });
  };

  const handleChangeAvatar = () => {
    console.log("Change Avatar pressed");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Box className="items-center mb-6">
          <Avatar size="2xl" className="mb-3">
            <AvatarImage source={{ uri: imageUrl }} />
          </Avatar>
          <AnimatedButton
            size={"md"}
            buttonClassName="rounded-xl"
            onPress={handleChangeAvatar}
            style={{ backgroundColor: colors.primary }}
          >
            Resim Ekle
          </AnimatedButton>
        </Box>

        <Box className="gap-4">
          <Input
            variant="rounded"
            size="lg"
            id="fullName"
            className="h-14 rounded-xl"
            style={{
              borderColor: colors.border,
            }}
          >
            <InputField
              onChangeText={(text) => setName(text)}
              placeholder="Ad-Soyad"
              style={{ color: colors.text }}
            />
          </Input>

          <Input
            variant="rounded"
            size="lg"
            id="email"
            className="h-14 rounded-xl"
            style={{
              borderColor: colors.border,
            }}
          >
            <InputField
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              style={{ color: colors.text }}
            />
          </Input>

          <Input
            variant="rounded"
            size="lg"
            id="phoneNumber"
            className="h-14 rounded-xl"
            style={{
              borderColor: colors.border,
            }}
          >
            <InputField
              onChangeText={(text) => setPhone(text)}
              placeholder="Telefon Numarası"
              style={{ color: colors.text }}
            />
          </Input>

          <AnimatedButton
            size={"lg"}
            buttonClassName="rounded-xl h-14 mt-6"
            onPress={handleSave}
            style={{ backgroundColor: colors.primary }}
            textClassName=" font-semibold"
          >
            Kaydet
          </AnimatedButton>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
