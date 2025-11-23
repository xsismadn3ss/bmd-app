import React, { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface FadeInProps {
  duration?: number;
  delay?: number;
  children: React.ReactNode;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

export function FadeIn({
  duration = 1000,
  delay = 0,
  children,
  style,
}: FadeInProps) {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: duration }));
  }, []);

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
}
