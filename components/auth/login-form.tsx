import { useThemeColor } from "@/hooks/use-theme-color";
import { isEmojiSafe, validateEmailFormat } from "@/utils/text";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";
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

interface LoginFormState {
  email: string;
  password: string;
}

interface Error {
  value?: string;
  border: string;
}

interface LoginFormErrorState {
  email: Error;
  password: Error;
}

export default function LoginForm() {
  const { colors } = useTheme();
  const placeholderColor = "#686868ff";
  const errorBorder = "#9b2c2cff";
  const backgroundColor = useThemeColor(
    { light: "#f7f7f7ff", dark: "#111111ff" },
    "background"
  );

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const initialErrors: LoginFormErrorState = {
    email: { value: undefined, border: colors.border },
    password: { value: undefined, border: colors.border },
  };

  const [errors, setErrors] = useState<LoginFormErrorState>(initialErrors);

  const handleChange = (name: keyof LoginFormState, value: string) => {
    setForm((prevform) => ({
      ...prevform,
      [name]: value,
    }));
  };

  const resetStyles = () => {
    setErrors(initialErrors);
  };

  const resetForm = () => {
    setForm({
      email: "",
      password: "",
    });
  };

  const validateForm = () => {
    let isValid = true;

    // validar que no este vacío
    const emailTrimed = form.email.trim();
    const passwordTrimed = form.password.trim();

    if (!emailTrimed) {
      setErrors((prev) => ({
        ...prev,
        email: { value: "El campo email es requerido", border: errorBorder },
      }));
      isValid = false;
    }
    if (!passwordTrimed) {
      setErrors((prev) => ({
        ...prev,
        password: {
          value: "El campo de constraseña es requerido",
          border: errorBorder,
        },
      }));
      isValid = false;
    }
    
    // validar formato de email
    if (!validateEmailFormat(form.email)) {
      setErrors((prev) => ({
        ...prev,
        email: { value: "Formato invalido", border: errorBorder },
      }));
      isValid = false;
    }

    // validar que no contenga caracteres raros
    if (!isEmojiSafe(form.email)) {
      console.log('EMAIL: caracteres invalidos')
      setErrors((prev) => ({
        ...prev,
        email: {
          value: "El email contiene caracteres no permitidos",
          border: errorBorder,
        },
      }));
      isValid = false;
    }

    if (!isEmojiSafe(form.password)) {
      setErrors((prev) => ({
        ...prev,
        password: {
          value: "El campo de contraseña contiene caracteres no permitidos",
          border: errorBorder,
        },
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = () => {
    resetStyles();
    if (!validateForm()) return;
    resetForm();

    // TODO: agregar llamada a api y agregar validación
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* Campo de correo electrónico */}
      <View>
        <ThemedText>Email</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: errors.email.border,
              color: colors.text,
              backgroundColor,
            },
          ]}
          placeholder="satoshi@nakamoto.com"
          placeholderTextColor={placeholderColor}
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        {errors.email.value && (
          <SlideIn direction="down" offset={10}>
            <ThemedText style={styles.errorText}>
              {errors.email.value}
            </ThemedText>
          </SlideIn>
        )}
      </View>
      {/* Campo de contraseña */}
      <View>
        <ThemedText>Contraseña</ThemedText>
        <PasswordInput
          style={{
            borderColor: errors.password.border,
          }}
          placeholder="ingresa tu contraseña"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        {errors.password.value && (
          <SlideIn direction="down" offset={10}>
            <ThemedText style={styles.errorText}>
              {errors.password.value}
            </ThemedText>
          </SlideIn>
        )}
      </View>

      {/* Botón de enviar  */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "white" }}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    fontSize: 16,
    fontWeight: "200",
    padding: 10,
    paddingInline: 12,
  },
  button: {
    padding: 10,
    width: "100%",
    backgroundColor: "#e28700ff",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: '200'
  },
});
