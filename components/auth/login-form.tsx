import { useLoginForm } from "@/hooks/auth/use-login-form";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTheme } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SlideIn } from "../animation/slide-in";
import { PasswordInput } from "../forms/input";
import { ThemedText } from "../themed-text";

export default function LoginForm() {
  const { colors } = useTheme();
  const placeholderColor = "#686868ff";

  const { form, errors, isLoading, handleChange, handleLogin } = useLoginForm();

  const backgroundColor = useThemeColor(
    { light: "#f7f7f7ff", dark: "#111111ff" },
    "background"
  );

  const renderTextInput = (
    label: string,
    name: "email",
    placeholder: string,
    keyboardType: "default" | "email-address" = "default",
    autoCapitalize: "none" | "words" = "words"
  ) => (
    <View>
      <ThemedText>{label}</ThemedText>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: errors[name].border,
            color: colors.text,
            backgroundColor,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={form[name]}
        onChangeText={(text) => handleChange(name, text)}
      />
      {errors[name].value && (
        <SlideIn direction="down" offset={10}>
          <ThemedText style={styles.errorText}>{errors[name].value}</ThemedText>
        </SlideIn>
      )}
    </View>
  );

  // Función auxiliar para renderizar el input de contraseña
  const renderPasswordInput = (
    label: string,
    name: "password",
    placeholder: string
  ) => {
    const errorData = errors[name];

    return (
      <View>
        <ThemedText>{label}</ThemedText>
        <PasswordInput
          style={[styles.input, { borderColor: errorData.border }]}
          placeholder={placeholder}
          value={form[name]}
          onChangeText={(text) => handleChange(name, text)}
        />
        {errorData.value && (
          <SlideIn direction="down" offset={10}>
            <ThemedText style={styles.errorText}>{errorData.value}</ThemedText>
          </SlideIn>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Campo de correo electrónico */}
      {renderTextInput(
        "Email",
        "email",
        "satoshi@nakamoto.com",
        "email-address",
        "none"
      )}

      {/* Campo de contraseña */}
      {renderPasswordInput("Contraseña", "password", "ingresa tu contraseña")}

      {/* Botón de enviar  */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={{ color: "white" }}>
          {isLoading ? "Ingresando..." : "Ingresar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    fontSize: 16,
    fontWeight: "200",
    padding: 10,
    paddingHorizontal: 12,
  },
  button: {
    padding: 12,
    width: "100%",
    backgroundColor: "#e28700ff",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
    backgroundColor: "#9b2c2cff",
  },
  errorText: {
    color: "#9b2c2cff",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 4,
    paddingLeft: 4,
  },
});
