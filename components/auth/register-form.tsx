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
import { ThemedText } from "../themed-text";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const { colors } = useTheme();
  const placeholderColor = "#686868ff";
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

  const handleRegister = () => {
    // TODO: implementar llamada a API
    Alert.alert("Advertencia", "No implementado...");
  };

  return (
    <View style={styles.container}>
      {/* campo de nombre */}
      <View>
        <ThemedText>Nombre</ThemedText>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          placeholder="Satoshi Nakamoto"
          placeholderTextColor={placeholderColor}
          autoCorrect={true}
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>
      {/* campo de correo electrónico */}
      <View>
        <ThemedText>Email</ThemedText>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          placeholder="satoshi@nakamoto.com"
          placeholderTextColor={placeholderColor}
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
      </View>
      {/* Campo de contraseña */}
      <View>
        <ThemedText>Contraseña</ThemedText>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          placeholder="ingresa tu contraseña"
          placeholderTextColor={placeholderColor}
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
      </View>
      {/* Campo de confirmar contraseña */}
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="confirmar contraseña"
        placeholderTextColor={placeholderColor}
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />

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
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    fontSize: 16,
    fontWeight: "200",
    padding: 10,
  },
  button: {
    padding: 10,
    width: "100%",
    backgroundColor: "#e28700ff",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
});
