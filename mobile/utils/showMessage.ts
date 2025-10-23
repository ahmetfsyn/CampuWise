import Toast, { ToastShowParams } from "react-native-toast-message";
import useAppStore from "@/store/useAppStore";

const showMessage = (config: ToastShowParams) => {
  const { theme } = useAppStore.getState();
  const isDark = theme === "dark";

  return Toast.show({
    ...config,
    position: "top",
    text1Style: {
      fontSize: 14,
      color: isDark ? "#FFF" : "#000",
    },
    text2Style: {
      fontSize: 12,
      color: isDark ? "#DDD" : "#333",
    },

    props: {
      backgroundColor: isDark ? "#1C1C1C" : "#F5F5F5",
      borderColor: isDark ? "#333" : "#DDD",
    },
  });
};

export default showMessage;
