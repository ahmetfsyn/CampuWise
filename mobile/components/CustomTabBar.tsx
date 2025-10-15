import { Animated, Platform, Pressable, View } from "react-native";
import { useEffect, useRef } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "./ui/icon";
import { Dot } from "lucide-react-native";

const TabItem = ({
  route,
  navigation,
  options,
  isFocused,
}: {
  route: any;
  index: number;
  state: any;
  navigation: any;
  options: any;
  isFocused: boolean;
}) => {
  // anim value
  const scaleAnim = useRef(new Animated.Value(isFocused ? 1.2 : 1)).current;
  const bgAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const { colors } = useTheme();

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isFocused ? 1.2 : 1,
      useNativeDriver: false,
    }).start();

    Animated.timing(bgAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [bgAnim, scaleAnim, isFocused]);

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <Pressable
      key={route.name}
      onPress={onPress}
      className="flex-1 items-center justify-center p-3"
    >
      <Animated.View
        style={{
          borderRadius: 9999,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {isFocused ? (
          <LinearGradient
            colors={["#0a7ea4", "#38bdf8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 9999,
              padding: 8,
            }}
          >
            {options.tabBarIcon ? (
              options.tabBarIcon({
                focused: isFocused,
                color: colors.background,
                size: 28,
              })
            ) : (
              <Icon as={Dot} size={24} className="text-primary-0" />
            )}
          </LinearGradient>
        ) : (
          <View
            style={{
              borderRadius: 9999,
              padding: 8,
            }}
          >
            {options.tabBarIcon ? (
              options.tabBarIcon({
                focused: isFocused,
                color: colors.secondary,
                size: 28,
              })
            ) : (
              <Icon as={Dot} size={24} className="text-primary-0" />
            )}
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { colors } = useTheme();
  return (
    <View
      className={`flex flex-row items-center justify-center py-1 rounded-t-[32px]`}
      style={{
        backgroundColor: colors.background,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: Platform.OS === "android" ? 10 : 0,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TabItem
            key={route.key}
            route={route}
            index={index}
            state={state}
            navigation={navigation}
            options={options}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
};

export default CustomTabBar;
