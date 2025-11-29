import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import SplashScreen from "@/components/root/splash-screen";
import { AppThemeProvider, useAppTheme } from "@/context/AppThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "../context/AuthContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutInner() {
  const { colorScheme } = useAppTheme();
  const { isAuth, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth && isLoaded) {
      router.replace("/(auth)/sign-in-up");
    }
  }, [isAuth, isLoaded]);

  if (!isAuth && !isLoaded) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <GestureHandlerRootView>
          <LanguageProvider>
            <RootLayoutInner />
          </LanguageProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </AppThemeProvider>
  );
}
