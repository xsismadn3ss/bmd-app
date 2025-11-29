import { FadeIn } from "@/components/animation/fade-in";
import { ThemedText } from "@/components/themed-text";
import { DraggableBottomSheet } from "@/components/ui/draggable-bottom-sheet";
import { useAppTheme } from "@/context/AppThemeContext";
import { useTranslation } from "@/context/LanguageContext";
import { useModal } from "@/hooks/use-modal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemeList } from "./theme-list";

export function ThemeIcon() {
  const { colors } = useTheme();
  const t = useTranslation();
  const { isVisible, openModal, closeModal } = useModal();
  const { colorScheme, theme, setTheme } = useAppTheme();
  const headerHeight = 400;

  return (
    <>
      {/* icon */}
      <TouchableOpacity style={styles.button} onPress={openModal}>
        {colorScheme === "dark" && (
          <FadeIn duration={300}>
            <MaterialIcons
              name="dark-mode"
              size={24}
              color={colors.text}
              style={[styles.icon, { shadowColor: colors.text }]}
            />
          </FadeIn>
        )}
        {colorScheme === "light" && (
          <MaterialIcons
            name="light-mode"
            size={24}
            color={colors.text}
            style={[styles.icon, { shadowColor: colors.text }]}
          />
        )}
        <ThemedText style={styles.text}>{t(theme)}</ThemedText>
      </TouchableOpacity>
      {/* Drawer */}
      <DraggableBottomSheet
        isVisible={isVisible}
        onClose={closeModal}
        headerHeight={headerHeight}
      >
        <ThemeList
          currentTheme={theme}
          onSelect={setTheme}
          onClose={closeModal}
        />
      </DraggableBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 1,
    shadowOpacity: 0.3,
    opacity: 0.5,
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "200",
    opacity: 0.6,
  },
});
