import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface BaseProps {
  children?: React.ReactNode;
}

interface ViewStyleProps {
  style?: StyleProp<ViewStyle>;
}

interface CardProps extends BaseProps, ViewStyleProps {
  lightColor?: string;
  darkColor?: string;
}

export function Card(props: CardProps) {
  const { colors } = useTheme();
  const cardDark = "#1d1d1dff";

  return (
    <ThemedView
      darkColor={cardDark ?? props.darkColor}
      lightColor={props?.lightColor}
      style={[styles.card, props?.style, { borderColor: colors.border }]}
    >
      {props.children}
    </ThemedView>
  );
}

interface CardHeaderProps extends BaseProps, ViewStyleProps {}

export function CardHeader(props: CardHeaderProps) {
  return (
    <View style={[styles.cardHeader, props?.style]}>{props.children}</View>
  );
}

interface CardTitleProps extends BaseProps {
  style?: StyleProp<TextStyle>;
  lightColor?: string;
  darkColor?: string;
}

export function CardTitle(props: CardTitleProps) {
  return (
    <ThemedText
      darkColor={props.darkColor}
      lightColor={props.lightColor}
      style={[styles.cardTitle, props.style]}
    >
      {props.children}
    </ThemedText>
  );
}

interface CardContentProps extends BaseProps, ViewStyleProps {}

export function CardContent(props: CardContentProps) {
  return (
    <View style={[styles.cardContent, props.style]}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    borderRadius: 8,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  cardHeader: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 10,
    gap: 10
  },
});
