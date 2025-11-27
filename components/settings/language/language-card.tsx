import { DraggableBottomSheet } from "@/components/ui/draggable-bottom-sheet";
import { useLanguage } from "@/context/LanguageContext";
import Entypo from "@expo/vector-icons/Entypo";
import { useHeaderHeight } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../../themed-text";
import { Card, CardOption } from "../settings-card";
import { LanguageList } from "./language-list";

const languages = {
  en: "English",
  es: "Español",
};

export function LanguageCard() {
  const { lang, setLang } = useLanguage();
  const { colors } = useTheme();
  const [visible, setVisible] = useState<boolean>(false);
  const headerHeight = useHeaderHeight();

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      {/* Tarjeta */}
      <Card>
        <TouchableOpacity onPress={() => setVisible(true)}>
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
        isVisible={visible}
        onClose={handleClose}
        headerHeight={headerHeight}
      >
        <LanguageList
          currentLang={lang}
          onSelect={setLang}
          onClose={handleClose}
        />
      </DraggableBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    paddingVertical: 8
  },
  button: {
    borderRadius: 20,
  },
});
