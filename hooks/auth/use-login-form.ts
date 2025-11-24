import { isEmojiSafe, validateEmailFormat } from "@/utils/text";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";

interface LoginFormState {
  email: string;
  password: string;
}

interface Error {
  value?: string;
  border: string;
}

interface LoginFormErrorState {
  email: Error;
  password: Error;
}

export function useLoginForm() {
  const { colors } = useTheme();
  const errorBorder = "#9b2c2cff";
  const INITIAL_BORDER = colors.border;

  const initialErrors: LoginFormErrorState = {
    email: { value: undefined, border: INITIAL_BORDER },
    password: { value: undefined, border: INITIAL_BORDER },
  };

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrorState>(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: keyof LoginFormState, value: string) => {
    setForm((prevform) => ({
      ...prevform,
      [name]: value,
    })); // Limpiar el error del campo al escribir

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: { border: INITIAL_BORDER, value: undefined },
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

    const emailTrimed = currentForm.email.trim();
    const passwordTrimed = currentForm.password.trim(); // Validación 1: Campos vacíos

    if (!emailTrimed) {
      newErrors.email = {
        value: "El campo email es requerido",
        border: errorBorder,
      };
      isValid = false;
    }
    if (!passwordTrimed) {
      newErrors.password = {
        value: "El campo de contraseña es requerido",
        border: errorBorder,
      };
      isValid = false;
    } // Validación 2: Caracteres no permitidos (emojis)

    if (emailTrimed && !isEmojiSafe(emailTrimed)) {
      newErrors.email = {
        value: "El email contiene caracteres no permitidos",
        border: errorBorder,
      };
      isValid = false;
    }

    if (passwordTrimed && !isEmojiSafe(passwordTrimed)) {
      newErrors.password = {
        value: "La contraseña contiene caracteres no permitidos",
        border: errorBorder,
      };
      isValid = false;
    }

    // Validación 3: Formato de email (solo si pasó la validación de emojis/vacío)
    if (
      emailTrimed &&
      isEmojiSafe(emailTrimed) &&
      !validateEmailFormat(emailTrimed)
    ) {
      newErrors.email = {
        value: "Formato de email inválido",
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
    try {
      // TODO: Aquí se agregaría la llamada a la API
      console.log("Intentando iniciar sesión con:", form.email);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulación de API // Éxito en el login

      resetForm();
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error de Login:", error); // Ejemplo: Mostrar un error genérico si falla la autenticación
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: { value: "Email o contraseña incorrectos", border: errorBorder },
      }));
    } finally {
      setIsLoading(false);
    }
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
