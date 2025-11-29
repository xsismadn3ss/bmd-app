import { ThemedText } from "@/components/themed-text";
import { useTranslation } from "@/context/LanguageContext";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const AVAILABLE_THEMES = ["system", "light", "dark"] as const;
type ThemePreference = "system" | "light" | "dark";

interface ThemeListProps {
  currentTheme: string;
  onSelect: (theme: ThemePreference) => void;
  onClose: () => void;
}

export function ThemeList({ currentTheme, onSelect, onClose }: ThemeListProps) {
  const { colors } = useTheme();
  const t = useTranslation();

  const handleSelect = (theme: ThemePreference) => {
    onSelect(theme);
    onClose();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {AVAILABLE_THEMES.map((theme, index) => {
        const isSelected = currentTheme === theme;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(theme)}
            style={[
              styles.row,
              index < AVAILABLE_THEMES.length - 1 && {
                borderBottomColor: colors.border,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            ]}
          >
            <View>
              <ThemedText style={isSelected ? styles.selectedText : undefined}>
                {t(theme)}
              </ThemedText>
            </View>
            {isSelected && (
              <Entypo
                name="check"
                size={20}
                color={colors.text}
                style={{ opacity: 0.3 }}
              />
            )}
          </TouchableOpacity>
        );
      })}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  selectedText: {
    fontWeight: "bold",
  },
});
