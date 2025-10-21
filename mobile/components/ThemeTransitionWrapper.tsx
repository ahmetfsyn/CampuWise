// import { useEffect, useRef, useState } from "react";
// import { Animated, View } from "react-native";
// import useAppStore from "@/store/useAppStore";
// import SplashScreen from "./SplashScreenUI";

// const ThemeTransitionWrapper = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const { theme } = useAppStore((state) => state);
//   const [prevTheme, setPrevTheme] = useState(theme);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   useEffect(() => {
//     if (prevTheme !== theme) {
//       setIsTransitioning(true);

//       Animated.sequence([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 250,
//           useNativeDriver: true,
//         }),
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 400,
//           delay: 300,
//           useNativeDriver: true,
//         }),
//       ]).start(() => {
//         setPrevTheme(theme);
//         setIsTransitioning(false);
//       });
//     }
//   }, [theme]);

//   return (
//     <View style={{ flex: 1 }}>
//       {children}
//       {isTransitioning && (
//         <Animated.View
//           style={{
//             position: "absolute",
//             inset: 0,
//             opacity: fadeAnim,
//           }}
//         >
//           <SplashScreen onFinish={() => {}} />
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// export default ThemeTransitionWrapper;
