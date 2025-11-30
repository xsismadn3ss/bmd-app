import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

type ThemePreference = "system" | "light" | "dark";
type ResolvedScheme = "light" | "dark";

interface AppThemeContextValue {
  /** tema seleccionado por el usuario o sistema */
  theme: ThemePreference;
  /** esquema de color resuelto (light o dark) */
  colorScheme: ResolvedScheme;
  /** función para cambiar el tema */
  setTheme: (theme: ThemePreference) => void;
}

const THEME_KEY = "app_theme";

const AppThemeContext = createContext<AppThemeContextValue | undefined>(
  undefined
);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = useSystemColorScheme() ?? "light";
  const [theme, setThemeState] = useState<ThemePreference>("system");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (stored === "light" || stored === "dark" || stored === "system") {
          setThemeState(stored);
        }
      } catch (e) {
        console.warn("Error al cargar tema:", e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const setTheme = (value: ThemePreference) => {
    setThemeState(value);
    AsyncStorage.setItem(THEME_KEY, value).catch((e) =>
      console.warn("Error al guardar tema:", e)
    );
  };

  const resolved: ResolvedScheme =
    theme === "system" ? (systemScheme === "dark" ? "dark" : "light") : theme;

  if (!loaded) {
    // Podrías mostrar un splash o un loader aquí
    return null;
  }

  return (
    <AppThemeContext.Provider
      value={{
        theme,
        colorScheme: resolved,
        setTheme,
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};

export function useAppTheme() {
  const ctx = useContext(AppThemeContext);
  if (!ctx) {
    throw new Error("useAppTheme debe usarse dentro de AppThemeProvider");
  }
  return ctx;
}
