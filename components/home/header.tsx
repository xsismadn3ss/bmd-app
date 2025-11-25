import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { IconSymbol } from "../ui/icon-symbol";

export function HomeHeader() {
  return (
    <View style={styles.container}>
      <IconSymbol size={24} name="house.fill" color={"orange"} />
      <ThemedText style={styles.title}>Bitcoin Meetings Directory</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: "10",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
