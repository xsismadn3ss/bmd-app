import LoginForm from "@/components/auth/login-form";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function AuthHomeScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <ThemedView style={styles.container}>

      {/* Formularios de login y register */}
      <View style={styles.card}>
        <View style={[styles.selector, { borderColor: colors.border }]}>
          <SegmentedControl
            values={["Iniciar sesión", "Registrarse"]}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            backgroundColor={colors.card}
            tintColor="#e28700ff"
            fontStyle={{ color: colors.text }}
            activeFontStyle={{ color: "#fff" }}
          />
        </View>
        {selectedIndex === 0 && <LoginForm />}
        {selectedIndex === 1 && <ThemedText>TODO: formulario de registro</ThemedText>}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 40,
    flex: 1,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    padding: 10,
    gap: 30
  },
  selector: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
  },
});
