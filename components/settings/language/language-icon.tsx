import { ThemedText } from "@/components/themed-text";
import { DraggableBottomSheet } from "@/components/ui/draggable-bottom-sheet";
import { useLanguage, useTranslation } from "@/context/LanguageContext";
import { useModal } from "@/hooks/use-modal";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LanguageList } from "./language-list";

export function LanguageIcon() {
  const { isVisible, openModal, closeModal } = useModal();
  const t = useTranslation();
  const { lang, setLang } = useLanguage();
  const { colors } = useTheme();
  const headerHeight = 400;

  return (
    <>
      {/* Icono */}
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Entypo
          name="language"
          size={24}
          color={colors.text}
          style={[styles.icon, { textShadowColor: colors.text }]}
        />
        <ThemedText style={styles.text}>{t(lang)}</ThemedText>
      </TouchableOpacity>
      {/* Drawer */}
      <DraggableBottomSheet
        isVisible={isVisible}
        onClose={closeModal}
        headerHeight={headerHeight}
      >
        <LanguageList
          currentLang={lang}
          onSelect={setLang}
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
    opacity: 0.4,
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
