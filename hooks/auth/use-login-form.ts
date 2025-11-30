import { login } from "@/api/auth";
import { useLanguage } from "@/context/LanguageContext";
import { isEmojiSafe, validateEmailFormat } from "@/utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";

interface LoginFormState {
  email: string;
  password: string;
}

interface Error {
  value?: string;
  border?: string;
}

interface LoginFormErrorState {
  email: Error;
  password: Error;
}

export function useLoginForm() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const errorBorder = "#9b2c2cff";

  const initialErrors: LoginFormErrorState = {
    email: { value: undefined, border: undefined },
    password: { value: undefined, border: undefined },
  };

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrorState>(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: keyof LoginFormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    })); // Limpiar el error del campo al escribir

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: { border: undefined, value: undefined },
    }));
  };

  const resetStyles = () => {
    setErrors(initialErrors);
  };

  const resetForm = () => {
    setForm({
      email: "",
      password: "",
    });
  };

  const validateForm = (currentForm: LoginFormState): boolean => {
    let isValid = true;
    let newErrors: LoginFormErrorState = JSON.parse(
      JSON.stringify(initialErrors)
    );

    const emailTrimmed = currentForm.email.trim();
    const passwordTrimmed = currentForm.password.trim(); // Validación 1: Campos vacíos

    if (!emailTrimmed) {
      newErrors.email = {
        value: t("emailRequired"),
        border: errorBorder,
      };
      isValid = false;
    }
    if (!passwordTrimmed) {
      newErrors.password = {
        value: t("passwordRequired"),
        border: errorBorder,
      };
      isValid = false;
    } // Validación 2: Caracteres no permitidos (emojis)

    if (emailTrimmed && !isEmojiSafe(form.email)) {
      newErrors.email = {
        value: t("emailWeirdCharacters"),
        border: errorBorder,
      };
      isValid = false;
    }

    if (passwordTrimmed && !isEmojiSafe(form.password)) {
      newErrors.password = {
        value: t("passwordWeirdCharacters"),
        border: errorBorder,
      };
      isValid = false;
    }

    // Validación 3: Validar formato de correo electrónico
    if (
      emailTrimmed &&
      !validateEmailFormat(emailTrimmed) &&
      isEmojiSafe(form.email)
    ) {
      newErrors.email = {
        value: t("emailFormatInvalid"),
        border: errorBorder,
      };
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    resetStyles();
    if (!validateForm(form)) return;
    setIsLoading(true);
    await login(form)
      .then(async (response) => {
        const data = response.data;
        await AsyncStorage.setItem("USER", data.name);
        await AsyncStorage.setItem("AUTH_TOKEN", data.token);
        resetForm();
        router.replace("/(tabs)");
      })
      .catch((error) => {
        if (error.message == "Network Error") {
          setErrors((prev) => ({
            ...prev,
            password: {
              value: t("networkError"),
              border: colors.border,
            },
          }));
          return;
        }
        if (error.response.status == 404) {
          setErrors((prev) => ({
            ...prev,
            email: {
              value: t("accountNotFound"),
              border: errorBorder,
            },
          }));
        }

        if (error.response.status == 401) {
          setErrors((prev) => ({
            ...prev,
            password: {
              value: t("passwordIncorrect"),
              border: errorBorder,
            },
          }));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    form,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    resetStyles,
    validateForm,
  };
}
