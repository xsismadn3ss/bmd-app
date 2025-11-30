import { useTheme } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonType = "primary" | "secondary";

type ButtonProps = TouchableOpacityProps & {
  /** Tipo de botón, puede ser "primary" o "secondary" */
  type?: ButtonType;
} & {
  /** Indica si el botón debe tener sombra */
  shadow?: boolean;
};

export function Button({
  type = "primary",
  style,
  children,
  shadow = true,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();

  const combinedStyle = [
    style,
    styles.button,
    type === "primary" ? styles.primary : { backgroundColor: colors.card },
    { borderColor: colors.border },
  ];

  if (shadow) {
    combinedStyle.push({
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 10,
      shadowOpacity: 0.15,
    });
  }

  return (
    <TouchableOpacity style={combinedStyle} {...rest}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  primary: {
    backgroundColor: "#e28700ff",
  },
});
