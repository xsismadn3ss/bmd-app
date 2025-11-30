import { useThemeColor } from "@/hooks/use-theme-color";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from "react-native";

const PLACEHOLDER_COLOR = "#686868ff";

type InputProps = TextInputProps;

export function PasswordInput({
  value,
  style,
  placeholder,
  onChangeText,
  ...rest
}: InputProps) {
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
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER_COLOR}
        secureTextEntry={isSecure}
        value={value}
        onChangeText={onChangeText}
        {...rest}
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

export function Input({
  style,
  placeholder,
  placeholderTextColor = PLACEHOLDER_COLOR,
  keyboardType,
  autoCapitalize,
  value,
  onChangeText,
  ...rest
}: InputProps) {
  const { colors } = useTheme();
  const backgroundColor = useThemeColor(
    { light: "#f7f7f7ff", dark: "#111111ff" },
    "background"
  );
  return (
    <TextInput
      style={[
        {
          color: colors.text,
          backgroundColor,
        },
        styles.input,
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
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
    fontSize: 16,
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
      height: 1,
    },
    textShadowRadius: 4,
  },
});
