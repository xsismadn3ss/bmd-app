import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export function Card({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const cardDark = "#1d1d1dff";
  return (
    <ThemedView darkColor={cardDark} style={[styles.card, style]}>
      {children}
    </ThemedView>
  );
}

export function CardTitle({ children }: { children: string }) {
  return <ThemedText style={styles.cardTitle}>{children}</ThemedText>;
}

export function CardText({ children }: { children: string }) {
  return <ThemedText style={styles.cardText}>{children}</ThemedText>;
}

export function CardOption({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.cardOption, style]}>{children}</View>;
}

export function CardLine() {
  const { colors } = useTheme();
  return <View style={[styles.cardLine, { borderColor: colors.text }]} />;
}

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    borderRadius: 8,
    gap: 10,
    paddingVertical: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    paddingInline: 10,
    paddingTop: 10,
  },
  cardText: {
    fontWeight: "500",
    fontSize: 15,
  },
  cardOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 15,
  },
  cardLine: {
    width: "100%",
    borderWidth: 0.3,
    opacity: 0.2,
    marginBlock: 5,
  },
});
