import { useThemeColor } from "@/hooks/use-theme-color";
import {
  isEmojiSafe,
  validateEmailFormat,
  validatePasswordSecurity,
} from "@/utils/text";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SlideIn } from "../animation/slide-in";
import { PasswordInput } from "../forms/input";
import { ThemedText } from "../themed-text";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Error {
  border: string;
  value: string | undefined;
}

interface PasswordError {
  border: string;
  value: string[] | undefined;
}

interface RegisterFormErrorState {
  name: Error;
  email: Error;
  password: PasswordError;
  confirm: Error;
}

export default function RegisterForm() {
  const { colors } = useTheme();
  const placeholderColor = "#686868ff";
  const errorBorder = "#9b2c2cff";
  const backgroundColor = useThemeColor(
    { light: "#f7f7f7ff", dark: "#111111ff" },
    "background"
  );

  const INITIAL_ERRORS: RegisterFormErrorState = {
    name: { value: undefined, border: colors.border },
    email: { value: undefined, border: colors.border },
    password: { value: undefined, border: colors.border },
    confirm: { value: undefined, border: colors.border },
  };

  const [form, setForm] = useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name: keyof RegisterFormState, value: string) => {
    setForm((prevform) => ({
      ...prevform,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState<RegisterFormErrorState>(INITIAL_ERRORS);

  const resetStyles = () => {
    setErrors(INITIAL_ERRORS);
  };

  const validateForm = () => {
    let isValid = true;

    // validar que no hayan campos vacíos
    const nameTrimed = form.name.trim();
    const emailTrimed = form.email.trim();
    const passwordTrimed = form.password.trim();
    const confirmPasswordTrimed = form.confirmPassword.trim();

    if (!nameTrimed) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: { value: "El nombre es obligatorio", border: errorBorder },
      }));
    }
    if (!emailTrimed) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: { value: "El email es obligatorio", border: errorBorder },
      }));
    }
    if (!passwordTrimed) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: {
          value: ["La contraseña es obligatoria"],
          border: errorBorder,
        },
      }));
    }
    if (!confirmPasswordTrimed) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm: {
          value: "La confirmación de contraseña es obligatoria",
          border: errorBorder,
        },
      }));
    }

    // validar que no se pongan caracteres extraños
    // validarr email
    if (!isEmojiSafe(emailTrimed)) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: {
          value: "El email contiene caracteres no permitidos",
          border: errorBorder,
        },
      }));
    }
    // validar nombre
    if (!isEmojiSafe(nameTrimed)) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: {
          value: "El nombre contiene caracteres no permitidos",
          border: errorBorder,
        },
      }));
    }
    // validar contraseña
    if (!isEmojiSafe(passwordTrimed)) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: {
          value: ["La contraseña contiene caracteres no permitidos"],
          border: errorBorder,
        },
      }));
    }
    // validar confirmación de contraseña
    if (!isEmojiSafe(confirmPasswordTrimed)) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm: {
          value:
            "La confirmación de contraseña contiene caracteres no permitidos",
          border: errorBorder,
        },
      }));
    }

    // validar que las contraseñas coincidan
    if (passwordTrimed !== confirmPasswordTrimed) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm: { value: "Las contraseñas no coinciden", border: errorBorder },
      }));
    }

    // validar formato de correo electrónico
    if (!validateEmailFormat(form.email)) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: { value: "Formato inválido", border: errorBorder },
      }));
    }

    // validar qeue la contraseña sea segura
    const passwordTest = validatePasswordSecurity(passwordTrimed);
    if (!passwordTest.isValid) {
      isValid = false;
      // determinar el mensaje de error
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: {
          border: errorBorder,
          value: passwordTest.failedRequirements.map((requirement) => {
            switch (requirement) {
              case "MIN_LENGTH":
                return `La contraseña debe tener al menos ${8} caracteres`;
              case "UPPERCASE":
                return "La contraseña debe tener al menos una letra mayúscula";
              case "LOWERCASE":
                return "La contraseña debe tener al menos una letra minúscula";
              case "NUMBER":
                return "La contraseña debe tener al menos un número";
              case "SPECIAL_CHAR":
                return "La contraseña debe tener al menos un carácter especial";
              default:
                return "";
            }
          }),
        },
      }));

      return isValid;
    }
  };

  const handleRegister = () => {
    resetStyles();
    const formIsValid = validateForm();
    if (!formIsValid) return;
    Alert.alert("Registro exitoso", "Tu cuenta ha sido creada exitosamente");
  };

  return (
    <View style={styles.container}>
      {/* campo de nombre */}
      <View>
        <ThemedText>Nombre</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: errors.name.border,
              color: colors.text,
              backgroundColor,
            },
          ]}
          placeholder="Satoshi Nakamoto"
          placeholderTextColor={placeholderColor}
          autoCapitalize="words"
          autoCorrect={true}
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        {errors.name.value && (
          <SlideIn direction="down" offset={10}>
            <ThemedText style={styles.errorText}>
              {errors.name.value}
            </ThemedText>
          </SlideIn>
        )}
      </View>
      {/* campo de correo electrónico */}
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
          style={[styles.input, { borderColor: errors.password.border }]}
          placeholder="ingresa tu contraseña"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        {errors.password.value && (
          <>
            {errors.password.value.map((errMsg, index) => (
              <SlideIn direction="down" offset={10} key={index}>
                <ThemedText style={styles.errorText}>{errMsg}</ThemedText>
              </SlideIn>
            ))}
          </>
        )}
      </View>
      {/* Campo de confirmar contraseña */}
      <View>
        <PasswordInput
          style={[styles.input, { borderColor: errors.confirm.border }]}
          placeholder="confirmar contraseña"
          // placeholderTextColor={placeholderColor}
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
        />
        {errors.confirm.value && (
          <SlideIn direction="down" offset={10}>
            <ThemedText style={styles.errorText}>
              {errors.confirm.value}
            </ThemedText>
          </SlideIn>
        )}
      </View>

      {/* Botón de enviar  */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={{ color: "white" }}>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
    flex: 1,
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
    opacity: 0.8,
  },
});
