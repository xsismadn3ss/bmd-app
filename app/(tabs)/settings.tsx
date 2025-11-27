import { Container } from "@/components/container";
import { LanguageCard } from "@/components/settings/language/language-card";
import ThemeSelector from "@/components/settings/theme-selector";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTranslation } from "@/context/LanguageContext";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const t = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <Container style={{ gap: 30 }} maxWidth={700}>
        {/* Tema */}
        <View>
          <ThemedText style={styles.title}>{t("theme")}</ThemedText>
          <ThemeSelector />
        </View>
        {/* Lenguaje */}
        <View>
          <ThemedText style={styles.title}>{t("language")}</ThemedText>
          <LanguageCard />
        </View>
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
