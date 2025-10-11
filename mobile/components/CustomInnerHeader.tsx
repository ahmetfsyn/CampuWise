import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";
const CustomInnerHeader = ({
  navigation,
  options,
  route,
}: StackHeaderProps | any) => {
  const { colors } = useTheme();
  const title = options?.title || route.name || "Başlık";

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        height: 90,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30, // status bar boşluğu
        paddingHorizontal: 16,
        justifyContent: "space-between",
      }}
      className="rounded-b-[32px]"
    >
      {/* Geri Butonu */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        disabled={!navigation.canGoBack()}
        style={{
          opacity: navigation.canGoBack() ? 1 : 0,
          padding: 4,
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={colors.background}
        />
      </TouchableOpacity>

      {/* Başlık */}
      <Text
        style={{
          color: colors.background,
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
          flex: 1,
        }}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Sağ boşluk (geri tuşu hizası için) */}
      <View style={{ width: 28 }} />
    </View>
  );
};

export default CustomInnerHeader;
