import { register } from "@/api/auth";
import { useTranslation } from "@/context/LanguageContext";
import {
  isEmojiSafe,
  validateEmailFormat,
  validatePasswordSecurity,
} from "@/utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Error {
  border?: string;
  value: string | undefined;
}

interface PasswordError {
  border?: string;
  value: string[] | undefined;
}

interface RegisterFormErrorState {
  name: Error;
  email: Error;
  password: PasswordError;
  confirmPassword: Error;
}

export function useRegistrationForm() {
  const { colors } = useTheme();
  const t = useTranslation();
  const errorBorder = "#9b2c2cff";

  const INITIAL_ERRORS: RegisterFormErrorState = {
    name: { value: undefined, border: undefined },
    email: { value: undefined, border: undefined },
    password: { value: undefined, border: undefined },
    confirmPassword: { value: undefined, border: undefined },
  };

  const [form, setForm] = useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<RegisterFormErrorState>(INITIAL_ERRORS);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: keyof RegisterFormState, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: {
        ...prevErrors[name as keyof RegisterFormErrorState],
        border: undefined,
        value: undefined,
      },
    }));
  };

  const resetStyles = () => {
    setErrors(INITIAL_ERRORS);
  };

  const validateForm = (currentForm: RegisterFormState): boolean => {
    let isValid = true;
    let newErrors: RegisterFormErrorState = JSON.parse(
      JSON.stringify(INITIAL_ERRORS)
    );

    const { name, email, password, confirmPassword } = currentForm;

    // Validación 1: Campos vacíos y emojis
    if (!name.trim()) {
      isValid = false;
      newErrors.name = {
        value: t("nameRequired"),
        border: errorBorder,
      };
    } else if (!isEmojiSafe(name.trim())) {
      isValid = false;
      newErrors.name = {
        value: t("nameWeirdCharacters"),
        border: errorBorder,
      };
    }

    if (!email.trim()) {
      isValid = false;
      newErrors.email = {
        value: t("emailRequired"),
        border: errorBorder,
      };
    } else if (!isEmojiSafe(email.trim())) {
      isValid = false;
      newErrors.email = {
        value: t("emailWeirdCharacters"),
        border: errorBorder,
      };
    }

    if (!password.trim()) {
      isValid = false;
      newErrors.password = {
        value: [t("passwordRequired")],
        border: errorBorder,
      };
    } else if (!isEmojiSafe(password.trim())) {
      isValid = false;
      newErrors.password = {
        value: [t("passwordWeirdCharacters")],
        border: errorBorder,
      };
    }

    if (!confirmPassword.trim()) {
      isValid = false;
      newErrors.confirmPassword = {
        value: t("confirmPasswordRequired"),
        border: errorBorder,
      };
    } else if (!isEmojiSafe(confirmPassword.trim())) {
      isValid = false;
      newErrors.confirmPassword = {
        value: t("confirmPasswordWeirdCharacters"),
        border: errorBorder,
      };
    }

    // Validación 2: Formato de Correo Electrónico
    if (email.trim() && !validateEmailFormat(email.trim())) {
      isValid = false;
      newErrors.email = {
        value: t("emailFormatInvalid"),
        border: errorBorder,
      };
    }

    // Validación 3: Coincidencia de Contraseñas
    if (
      password.trim() &&
      confirmPassword.trim() &&
      password.trim() !== confirmPassword.trim()
    ) {
      isValid = false;
      newErrors.confirmPassword = {
        value: t("confirmPasswordMismatch"),
        border: errorBorder,
      };
    }

    // Validación 4: Seguridad de Contraseña (Solo si no hay errores previos en password)
    if (password.trim() && isEmojiSafe(password.trim())) {
      const passwordTest = validatePasswordSecurity(password.trim());
      if (!passwordTest.isValid) {
        isValid = false;
        const messages = passwordTest.failedRequirements.map((requirement) => {
          switch (requirement) {
            case "MIN_LENGTH":
              return t("passwordMinLength");
            case "UPPERCASE":
              return t("passwordUppercase");
            case "LOWERCASE":
              return t("passwordLowercase");
            case "NUMBER":
              return t("passwordNumber");
            case "SPECIAL_CHAR":
              return t("passwordSpecialChar");
            default:
              return "";
          }
        });
        newErrors.password = { border: errorBorder, value: messages };
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    resetStyles(); // Limpiar estilos previos (útil antes de validar)
    const formIsValid = validateForm(form);

    if (!formIsValid) return;

    setIsLoading(true);

    await register({
      name: form.name,
      email: form.email,
      password: form.password,
    })
      .then(async (response) => {
        const data = response.data;
        await AsyncStorage.setItem("USER", data.name);
        await AsyncStorage.setItem("AUTH_TOKEN", data.token);
        router.replace("/(tabs)");
      })
      .catch((error) => {
        console.log(error);
        if (error.message == "Net") {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: {
              value: t("networkError"),
              border: colors.border,
            },
          }));
          return;
        }
        if (error.status == 409) {
          setErrors((prev) => ({
            ...prev,
            email: {
              value: t("emailAlreadyInUse"),
              border: errorBorder,
            },
          }));
          return;
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
    handleRegister,
    resetStyles,
    validateForm,
  };
}
