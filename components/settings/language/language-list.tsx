import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedText } from "../../themed-text";

const AVAILABLE_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

interface LanguageListProps {
  currentLang: string;
  onSelect: (langCode: any) => void;
  onClose: () => void;
}

export function LanguageList({
  currentLang,
  onSelect,
  onClose,
}: LanguageListProps) {
  const { colors } = useTheme();

  const handleSelect = (code: string) => {
    onSelect(code); // Esto llama a setLang de tu provider
    onClose(); // Cierra el drawer
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {AVAILABLE_LANGUAGES.map((language, index) => {
        const isSelected = currentLang === language.code;

        return (
          <TouchableOpacity
            key={language.code}
            onPress={() => handleSelect(language.code)}
            style={[
              styles.row,
              index < AVAILABLE_LANGUAGES.length - 1 && {
                borderBottomColor: colors.border,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            ]}
          >
            <View style={styles.textContainer}>
              <ThemedText style={isSelected ? styles.selectedText : undefined}>
                {language.label}
              </ThemedText>
            </View>

            {/* Icono de Check si está seleccionado */}
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

      {/* Espacio extra al final por seguridad visual */}
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
