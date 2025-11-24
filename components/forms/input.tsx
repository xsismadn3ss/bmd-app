import { useThemeColor } from "@/hooks/use-theme-color";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

const PLACEHOLDER_COLOR = "#686868ff";

interface PasswordInputProps {
  value?: string;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  secureTextEntry: boolean;
  onChangeText?: (text: string) => void;
}

export function PasswordInput(props: PasswordInputProps) {
  const { colors } = useTheme();
  const [isSecure, setIsSecure] = useState(true);
  const backgroundColor = useThemeColor(
    { light: "#f7f7f7ff", dark: "#111111ff" },
    "background"
  );
  const toggleSecureEntry = () => {
    setIsSecure((prev) => !prev);
  };
  const iconName = isSecure ? "eye" : "eye-with-line";

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          {
            color: colors.text,
            backgroundColor,
          },
          styles.input,
          props.style,
        ]}
        placeholder={props.placeholder}
        placeholderTextColor={PLACEHOLDER_COLOR}
        secureTextEntry={isSecure}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      <TouchableOpacity
        onPress={toggleSecureEntry}
        style={styles.iconContainer}
      >
        <Entypo
          name={iconName as any}
          color={colors.text}
          size={20}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontWeight: "200",
    width: "100%",
  },
  iconContainer: {
    paddingLeft: 10,
    justifyContent: "center",
    position: "absolute",
    right: 10,
  },
  icon: {
    opacity: 0.8,
    textShadowOffset: {
      width: 0,
      height: 1
    },
    textShadowRadius: 4
  },
});
