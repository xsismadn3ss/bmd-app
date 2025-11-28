import { useAppTheme } from "@/context/AppThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useTheme } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Card } from "./settings-card";

export default function ThemeSelector({
  onThemeChange,
}: {
  onThemeChange?: (theme: "system" | "light" | "dark") => void;
}) {
  const { t } = useLanguage();
  const { setTheme } = useAppTheme();
  const backgroundColor = useThemeColor(
    { light: undefined, dark: "#1d1d1dff" },
    "background"
  );
  const { colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const THEME_KEY = "app_theme";
  const indexToTheme: ("system" | "light" | "dark")[] = [
    "system",
    "light",
    "dark",
  ];
  const themeToIndex: Record<string, number> = {
    system: 0,
    light: 1,
    dark: 2,
  };

  useEffect(() => {
    // Cargar tema guardado al montar
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (stored) {
          const idx = themeToIndex[stored];
          if (typeof idx === "number") setSelectedIndex(idx);
        }
      } catch (e) {
        // fallo al leer, dejar valor por defecto
        console.warn("Error al cargar tema:", e);
      }
    })();
  }, []);

  useEffect(() => {
    // Guardar cada vez que cambie la selección
    (async () => {
      try {
        const theme = indexToTheme[selectedIndex] ?? "system";
        setTheme(theme);
        await AsyncStorage.setItem(THEME_KEY, theme);
        onThemeChange?.(theme);
      } catch (e) {
        console.warn("Error al guardar tema:", e);
      }
    })();
  }, [selectedIndex, onThemeChange]);

  return (
    <Card
      style={{
        paddingBlock: 10,
        paddingHorizontal: 10,
      }}
    >
      <SegmentedControl
        values={[t("system"), t("light"), t("dark")]}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        backgroundColor={backgroundColor}
        tintColor="#e28700ff"
        fontStyle={{ color: colors.text }}
        activeFontStyle={{ color: "#ffffff" }}
      />
    </Card>
  );
}
