import { login } from "@/api/auth";
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
    setForm((prev) => ({
      ...prev,
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

    const emailTrimmed = currentForm.email.trim();
    const passwordTrimmed = currentForm.password.trim(); // Validación 1: Campos vacíos

    if (!emailTrimmed) {
      newErrors.email = {
        value: "El campo email es requerido",
        border: errorBorder,
      };
      isValid = false;
    }
    if (!passwordTrimmed) {
      newErrors.password = {
        value: "El campo de contraseña es requerido",
        border: errorBorder,
      };
      isValid = false;
    } // Validación 2: Caracteres no permitidos (emojis)

    if (emailTrimmed && !isEmojiSafe(form.email)) {
      newErrors.email = {
        value: "El email contiene caracteres no permitidos",
        border: errorBorder,
      };
      isValid = false;
    }

    if (passwordTrimmed && !isEmojiSafe(form.password)) {
      newErrors.password = {
        value: "La contraseña contiene caracteres no permitidos",
        border: errorBorder,
      };
      isValid = false;
    }

    // Validación 3: Validar formato de correo electrónico
    if (emailTrimmed && !validateEmailFormat(form.email)) {
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
    await login(form)
      .then(async (response) => {
        const data = response.data;
        await AsyncStorage.setItem("USER", data.name);
        await AsyncStorage.setItem("AUTH_TOKEN", data.token);
        router.replace("/(tabs)");
      })
      .catch((error) => {
        if (error.message == "Network Error") {
          setErrors((prev) => ({
            ...prev,
            password: {
              value: "No hay conexión a internet, no se pudo iniciar sesion",
              border: colors.border,
            },
          }));
          return;
        }
        let key = "email";
        if(error?.status == 404) key = "email";
        else key = 'password'
        setErrors((prev) => ({
          ...prev,
          [key]: {
            value: error.response.data.message,
            border: errorBorder,
          },
        }));
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
