import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";

const LoginScreen = () => {
  const handleLogin = async () => {
    // backend'den token alındığını varsayalım
    await AsyncStorage.setItem("token", "fake_token");
    router.replace("(tabs)");
  };
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button onPress={handleLogin}></Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
