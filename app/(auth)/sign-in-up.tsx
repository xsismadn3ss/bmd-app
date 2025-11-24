import { SlideIn } from "@/components/animation/slide-in";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { Container } from "@/components/container";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AuthHomeScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* header */}
          <IconSymbol name="house.fill" color={"orange"} size={50} />
          <ThemedText style={styles.title}>
            Bitcoin Meetings Directory
          </ThemedText>

          {/* Formularios de login y register */}
          <Container>
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
            {selectedIndex === 0 && (
              <SlideIn style={{ paddingTop: 20 }}>
                <LoginForm />
              </SlideIn>
            )}
            {selectedIndex === 1 && (
              <SlideIn
                direction="down"
                style={{ paddingTop: 20 }}
                duration={200}
              >
                <RegisterForm />
              </SlideIn>
            )}
          </Container>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 20,
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  selector: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
  },
});
