import { SlideIn } from "@/components/animation/slide-in";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { Container } from "@/components/container";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LanguageContext";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AuthHomeScreen() {
  const { colors } = useTheme();
  const t = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { isAuth, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isAuth) {
      // redirigir al inicio si esta autenticado
      router.replace("/(tabs)");
    }
  });

  if (!isLoaded && !isAuth) {
    return null;
  }

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
                values={[t("login"), t("signUp")]}
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
        {/* TODO: agegar opciones para cambiar tema e idioma */}
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
