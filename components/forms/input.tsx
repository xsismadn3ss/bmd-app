import { useThemeColor } from "@/hooks/use-theme-color";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const PLACEHOLDER_COLOR = "#686868ff";

interface PasswordInputProps {
  value?: string;
  style?: StyleProp<ViewStyle>;
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
    <View style={[props.style, styles.input, { backgroundColor }]}>
      <TextInput
        style={[
          {
            color: colors.text,
            backgroundColor,
            flex: 1,
            height: "100%",
            paddingVertical: 8,
          },
          styles.textInputBase,
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
          style={{ opacity: 0.8 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    padding: 2,
    paddingInline: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  textInputBase: {
    fontSize: 16,
    fontWeight: "200",
  },
  iconContainer: {
    paddingLeft: 10,
    justifyContent: "center",
  },
});
