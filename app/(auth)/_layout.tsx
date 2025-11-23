import { useAppTheme } from "@/context/AppThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function Layout(): React.JSX.Element {
  const { colorScheme } = useAppTheme();

  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in-up" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  );
}
