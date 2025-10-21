import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "@/assets/images/campuwise-logo-transparent.svg";

const AnimatedLogo = Animated.createAnimatedComponent(Logo);

const SplashScreenUI = () => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // başlangıç scale
  const opacityAnim = useRef(new Animated.Value(1)).current; // başlangıç opacity

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(2000),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={["#0a7ea4", "#38bdf8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center"
    >
      <AnimatedLogo
        width={300}
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      />
    </LinearGradient>
  );
};

export default SplashScreenUI;
