import { useEffect, useMemo } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { FadeIn, type FadeInProps } from "./fade-in";

type SlideDirection = "up" | "down" | "left" | "right";

interface SlideInProps extends FadeInProps {
  /**dirección de la animación */
  direction?: SlideDirection;
  /**distancia inicial de desplazamiento */
  offset?: number;
}

/**
 * Componente con animación Slide In
 */
export function SlideIn({
  duration = 300,
  delay = 0,
  direction = "up",
  offset = 50,
  children,
  style,
}: SlideInProps) {
  const slideOffset = useSharedValue(offset);

  const initialTransform = useMemo(() => {
    switch (direction) {
      case "up": // Viene de abajo (Y positivo)
        return { property: "translateY", initialValue: offset };
      case "down": // Viene de arriba (Y negativo)
        return { property: "translateY", initialValue: -offset };
      case "left": // Viene de la derecha (X positivo)
        return { property: "translateX", initialValue: offset };
      case "right": // Viene de la izquierda (X negativo)
        return { property: "translateX", initialValue: -offset };
      default:
        return { property: "translateY", initialValue: offset }; // Default a 'up'
    }
  }, [direction, offset]);

  const animatedStyle = useAnimatedStyle(() => {
    const transformProperty = initialTransform.property as
      | "translateX"
      | "translateY";

    if (transformProperty === "translateX") {
      return {
        transform: [{ translateX: slideOffset.value }],
      };
    } else {
      return {
        transform: [{ translateY: slideOffset.value }],
      };
    }
  }, [initialTransform]);

  useEffect(() => {
    slideOffset.value = initialTransform.initialValue;
    slideOffset.value = withDelay(delay, withTiming(0, { duration: duration }));
  }, [duration, delay, initialTransform]);

  return (
    // Combinamos el estilo animado generado con cualquier estilo adicional que pase el usuario
    <FadeIn duration={duration} delay={delay} style={[animatedStyle, style]}>
      {children}
    </FadeIn>
  );
}
