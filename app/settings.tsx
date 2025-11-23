import ThemeSelector from "@/components/settings/theme-selector";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Tema</ThemedText>
      <ThemeSelector/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlock: 20,
    paddingInline: 15,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    paddingBottom: 10
  },
});
