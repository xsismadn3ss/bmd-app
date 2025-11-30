import { TRANSLATIONS } from "@/constants/translations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LANG_KEY = "app_language";

type Lang = keyof typeof TRANSLATIONS;

type LanguageContextType = {
  /** idioma seleccionado */
  lang: Lang;
  /** función para cambiar el idioma */
  setLang: (l: Lang) => void;
  /** función de traducción */
  t: (key: string) => string;
  /** objeto de traducciones completo */
  translations: (typeof TRANSLATIONS)[Lang];
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  setLang: () => {},
  t: (k: string) => k,
  translations: TRANSLATIONS.en,
});

export function LanguageProvider({
  children,
  defaultLang = "en",
}: {
  children: ReactNode;
  defaultLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(LANG_KEY);
        if (stored && (TRANSLATIONS as Record<string, unknown>)[stored]) {
          setLangState(stored as Lang);
        }
      } catch (e) {
        console.warn("Error cargando idioma:", e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem(LANG_KEY, l).catch((e) =>
      console.warn("Error guardando idioma:", e)
    );
  };

  const translations = TRANSLATIONS[lang];

  const t = (key: string) => {
    return (translations as Record<string, string>)[key] ?? key;
  };

  const value = useMemo(() => ({ lang, setLang, t, translations }), [lang]);

  if (!loaded) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }
  return ctx;
};

export const useTranslation = () => {
  const { t } = useLanguage();
  return t;
};
