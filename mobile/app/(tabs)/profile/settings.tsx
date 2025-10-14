import { StyleSheet, Text, View } from "react-native";
import useAppStore from "@/store/useAppStore";
import AnimatedButton from "@/components/AnimatedButton";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const { toggleTheme: handleToggleTheme } = useAppStore((state) => state);
  return (
    <View>
      <Text>SettingsScreen</Text>
      <AnimatedButton
        onPress={handleToggleTheme}
        icon={
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color={"white"}
          />
        }
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
