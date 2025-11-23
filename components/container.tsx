import React from "react";
import {
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  maxWidth?: number;
}

/**
 * Contenedor responsivo
 * 
 * Ajusta ancho automáticamente según el tamaño de la pantalla
 */
export function Container({ style, children, maxWidth = 600 }: ContainerProps) {
  const { width } = useWindowDimensions();

  const containerStyle: StyleProp<ViewStyle>[] = [
    styles.container,
    style,
    width >= 768 && {
      maxWidth: maxWidth,
    },
  ];

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
});
