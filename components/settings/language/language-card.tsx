import { DraggableBottomSheet } from "@/components/ui/draggable-bottom-sheet";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/hooks/use-modal";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../../themed-text";
import { Card, CardOption } from "../settings-card";
import { LanguageList } from "./language-list";

const languages = {
  en: "English",
  es: "Español",
};

export function LanguageCard() {
  const { openModal, closeModal, isVisible } = useModal();
  const { lang, setLang } = useLanguage();
  const { colors } = useTheme();
  const headerHeight = 400;

  return (
    <>
      {/* Tarjeta */}
      <Card>
        <TouchableOpacity onPress={openModal}>
          <CardOption style={styles.iconContainer}>
            <ThemedText style={{ opacity: 0.6 }}>{languages[lang]}</ThemedText>
            <Entypo
              name="language"
              size={24}
              color={colors.text}
              style={{ opacity: 0.4 }}
            />
          </CardOption>
        </TouchableOpacity>
      </Card>

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
  iconContainer: {
    paddingVertical: 8,
  },
  button: {
    borderRadius: 20,
  },
});
