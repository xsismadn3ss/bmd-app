import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/icon-symbol";

export default function SplashScreen() {
  return (
    <ThemedView style={styles.container}>
      <View>
        <IconSymbol
          name="house.fill"
          color="orange"
          size={60}
          style={styles.icon}
        />
        <ThemedText style={styles.title}>Bitcoin Meetings Directory</ThemedText>
      </View>
      <ActivityIndicator size="large" color="orange" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
});
