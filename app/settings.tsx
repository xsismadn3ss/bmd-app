import { Container } from "@/components/container";
import ThemeSelector from "@/components/settings/theme-selector";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useLanguage } from "@/context/LanguageContext";
import { StyleSheet } from "react-native";

export default function SettingsScreen() {
  const { t } = useLanguage();

  return (
    <ThemedView style={styles.container}>
      <Container maxWidth={700}>
        <ThemedText style={styles.title}>{t("theme")}</ThemedText>
        <ThemeSelector />
      </Container>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlock: 20,
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    paddingBottom: 10,
  },
});
