import { useTranslation } from "@/context/LanguageContext";
import { StyleProp, TextStyle } from "react-native";
import { ThemedText } from "./themed-text";

interface TranslatedTextProps {
  /** Clave para traducir el texto */
  value: string;
  /** Estilo personalizado para el texto */
  style?: StyleProp<TextStyle>;
}
/**
 * Componente que muestra un texto traducido según la clave proporcionada.
 */
export function TranslatedText({ value, style }: TranslatedTextProps) {
  const t = useTranslation();
  return <ThemedText style={style}>{t(value)}</ThemedText>;
}
