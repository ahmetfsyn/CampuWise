import { StyleSheet, Text, View } from "react-native";
import useAppStore from "@/store/useAppStore";
import AnimatedButton from "@/components/AnimatedButton";
import { Moon, Sun } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
const SettingsScreen = () => {
  const { theme, toggleTheme: handleToggleTheme } = useAppStore(
    (state) => state
  );
  return (
    <View>
      <Text>SettingsScreen</Text>
      <AnimatedButton
        onPress={handleToggleTheme}
        icon={
          <Icon
            as={theme === "dark" ? Sun : Moon}
            size={24}
            className="text-primary-0"
          />
        }
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
