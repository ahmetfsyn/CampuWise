import { Theme } from "@react-navigation/native";

export const LightTheme: Theme = {
  dark: false,
  colors: {
    background: "#F5F5F0", // ana arka plan
    card: "#f8fafc", // header, tabbar card
    text: "#11181c", // genel text
    secondary: "#687076",
    primary: "#0a7ea4", // buton, aktif tab, accent
    border: "#e5e7eb", // ayırıcı çizgi
    notification: "#ff5a5f", // uyarılar
  },
  fonts: {
    heavy: {
      fontFamily: "Inter-ExtraBold",
      fontWeight: "800",
    },
    medium: {
      fontFamily: "Inter-Medium",
      fontWeight: "500",
    },
    regular: {
      fontFamily: "Inter-Regular",
      fontWeight: "400",
    },
    bold: {
      fontFamily: "Inter-Bold",
      fontWeight: "700",
    },
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    background: "#121d2c", // ana arka plan
    card: "#1f2a3c", // header, tabbar card
    text: "#ececee", // genel text
    secondary: "#9BA1A6",
    primary: "#38bdf8", // buton, aktif tab, accent
    border: "#1a4f73", // ayırıcı çizgi
    notification: "#ff5a5f", // uyarılar
  },
  fonts: {
    heavy: {
      fontFamily: "Inter-ExtraBold",
      fontWeight: "800",
    },
    medium: {
      fontFamily: "Inter-Medium",
      fontWeight: "500",
    },
    regular: {
      fontFamily: "Inter-Regular",
      fontWeight: "400",
    },
    bold: {
      fontFamily: "Inter-Bold",
      fontWeight: "700",
    },
  },
};
