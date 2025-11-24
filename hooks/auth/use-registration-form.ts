import {
  isEmojiSafe,
  validateEmailFormat,
  validatePasswordSecurity,
} from "@/utils/text";
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
  border: string;
  value: string | undefined;
}

interface PasswordError {
  border: string;
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
  const errorBorder = "#9b2c2cff";
  const INITIAL_BORDER = colors.border;

  const INITIAL_ERRORS: RegisterFormErrorState = {
    name: { value: undefined, border: INITIAL_BORDER },
    email: { value: undefined, border: INITIAL_BORDER },
    password: { value: undefined, border: INITIAL_BORDER },
    confirmPassword: { value: undefined, border: INITIAL_BORDER },
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
        border: INITIAL_BORDER,
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
        value: "El nombre es obligatorio",
        border: errorBorder,
      };
    } else if (!isEmojiSafe(name.trim())) {
      isValid = false;
      newErrors.name = {
        value: "El nombre contiene caracteres no permitidos",
        border: errorBorder,
      };
    }

    if (!email.trim()) {
      isValid = false;
      newErrors.email = {
        value: "El email es obligatorio",
        border: errorBorder,
      };
    } else if (!isEmojiSafe(email.trim())) {
      isValid = false;
      newErrors.email = {
        value: "El email contiene caracteres no permitidos",
        border: errorBorder,
      };
    }

    if (!password.trim()) {
      isValid = false;
      newErrors.password = {
        value: ["La contraseña es obligatoria"],
        border: errorBorder,
      };
    } else if (!isEmojiSafe(password.trim())) {
      isValid = false;
      newErrors.password = {
        value: ["La contraseña contiene caracteres no permitidos"],
        border: errorBorder,
      };
    }

    if (!confirmPassword.trim()) {
      isValid = false;
      newErrors.confirmPassword = {
        value: "La confirmación es obligatoria",
        border: errorBorder,
      };
    } else if (!isEmojiSafe(confirmPassword.trim())) {
      isValid = false;
      newErrors.confirmPassword = {
        value: "La confirmación contiene caracteres no permitidos",
        border: errorBorder,
      };
    }

    // Validación 2: Formato de Correo Electrónico
    if (email.trim() && !validateEmailFormat(email.trim())) {
      isValid = false;
      newErrors.email = {
        value: "Formato de email inválido",
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
        value: "Las contraseñas no coinciden",
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
              return `Debe tener al menos 8 caracteres`;
            case "UPPERCASE":
              return "Debe tener al menos una mayúscula";
            case "LOWERCASE":
              return "Debe tener al menos una minúscula";
            case "NUMBER":
              return "Debe tener al menos un número";
            case "SPECIAL_CHAR":
              return "Debe tener al menos un carácter especial";
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

    if (!formIsValid) {
      // No hacemos nada, los errores ya están seteados.
      return;
    }

    setIsLoading(true);
    try {
      // TODO: realizar llamada a API de registro
      console.log("Registrando usuario:", form.email);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulación de API

      // Éxito
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error en registro:", error);
      // Mostrar mensaje de error al usuario (ej. email ya existe)
    } finally {
      setIsLoading(false);
    }
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
