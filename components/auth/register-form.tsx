import { useRegistrationForm } from "@/hooks/auth/use-registration-form";
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

export default function RegisterForm() {
  const { colors } = useTheme();
  const placeholderColor = "#686868ff";

  const { form, errors, isLoading, handleChange, handleRegister } =
    useRegistrationForm();

  const backgroundColor = useThemeColor(
    { light: "#f7f7f7ff", dark: "#111111ff" },
    "background"
  );

  const renderTextInput = (
    label: string,
    name: keyof typeof form,
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
            borderColor: errors[name as "name" | "email"].border,
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
      {errors[name as "name" | "email"].value && (
        <SlideIn direction="down" offset={10}>
          <ThemedText style={styles.errorText}>
            {errors[name as "name" | "email"].value as string}
          </ThemedText>
        </SlideIn>
      )}
    </View>
  );

  // Función auxiliar para renderizar el input de contraseña
  const renderPasswordInput = (
    label: string,
    name: "password" | "confirmPassword",
    placeholder: string
  ) => {
    const errorData = errors[name] as any;

    return (
      <View>
        {label && <ThemedText>{label}</ThemedText>}
        <PasswordInput
          style={[styles.input, { borderColor: errorData?.border }]}
          placeholder={placeholder}
          value={(form as any)[name]}
          onChangeText={(text) => handleChange(name as any, text)}
        />
        {errorData.value && (
          <>
            {(Array.isArray(errorData.value)
              ? errorData.value
              : [errorData.value]
            ).map((errMsg: string, index: number) => (
              <SlideIn direction="down" offset={10} key={`${name}-${index}`}>
                <ThemedText style={styles.errorText}>{errMsg}</ThemedText>
              </SlideIn>
            ))}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* campo de nombre */}
      {renderTextInput(
        "Nombre",
        "name",
        "Satoshi Nakamoto",
        "default",
        "words"
      )}

      {/* campo de correo electrónico */}
      {renderTextInput(
        "Email",
        "email",
        "satoshi@nakamoto.com",
        "email-address",
        "none"
      )}

      <View style={{ gap: 20 }}>
        {/* Campo de contraseña */}
        {renderPasswordInput("Contraseña", "password", "ingresa tu contraseña")}

        {/* Campo de confirmar contraseña */}
        {renderPasswordInput("", "confirmPassword", "confirmar contraseña")}
      </View>

      {/* Botón de enviar */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={{ color: "white" }}>
          {isLoading ? "Creando..." : "Crear Cuenta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15, // Aumenté el gap para mejor separación
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    fontSize: 16,
    fontWeight: "200",
    padding: 10,
    paddingHorizontal: 12, // Usar paddingHorizontal es mejor que paddingInline
  },
  button: {
    padding: 12, // Un poco más de padding se siente mejor
    width: "100%",
    backgroundColor: "#e28700ff",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20, // Aumenté el margen superior
  },
  buttonDisabled: {
    opacity: 0.7,
    backgroundColor: "#9b2c2cff", // Color diferente cuando está deshabilitado
  },
  errorText: {
    color: "#9b2c2cff", // Usar el mismo color de error para el texto
    fontSize: 14,
    opacity: 1, // Asegurar que sea visible
    marginTop: 4,
    paddingLeft: 4,
  },
});
