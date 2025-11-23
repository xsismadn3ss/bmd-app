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

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { colors } = useTheme();
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const handleChange = (name: keyof LoginFormState, value: string) => {
    setForm((prevform) => ({
      ...prevform,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (!form.email.trim() || !form.password.trim()) {
      Alert.alert("Error", "Por favor, ingresa correo y contraseña.");
      return;
    }

    // 💡 Lógica de autenticación: Aquí harías una llamada a tu API
    console.log("Intentando iniciar sesión con:", form);
    Alert.alert("Éxito", "Simulación de inicio de sesión exitoso.");

    // Simular redirección a la página principal después del login
    // router.replace('/tabs/index');
  };

  return (
    <View style={styles.container}>
      {/* Campo de correo electrónico */}
      <View>
        <ThemedText>Email</ThemedText>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          placeholder="satoshi@nakamoto.com"
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
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
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
  },
  button: {
    padding: 10,
    width: "100%",
    backgroundColor: "#e28700ff",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15
  },
});
