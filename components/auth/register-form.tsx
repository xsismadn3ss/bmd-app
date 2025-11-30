import { useTranslation } from "@/context/LanguageContext";
import { useRegistrationForm } from "@/hooks/auth/use-registration-form";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, TextInput, View } from "react-native";
import { SlideIn } from "../animation/slide-in";
import { PasswordInput } from "../forms/input";
import { TranslatedText } from "../translated-text";
import { Button } from "../ui/button";

export default function RegisterForm() {
  const { colors } = useTheme();
  const t = useTranslation();
  const placeholderColor = "#686868ff";

  const { form, errors, isLoading, handleChange, handleRegister } =
    useRegistrationForm();

  const backgroundColor = useThemeColor(
    { light: "#f7f7f7ff", dark: "#111111ff" },
    "background"
  );

  const renderTextInput = (
    label: string,
    name: keyof typeof form,
    placeholder: string,
    keyboardType: "default" | "email-address" = "default",
    autoCapitalize: "none" | "words" = "words"
  ) => (
    <View>
      <TranslatedText value={label} />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: errors[name as "name" | "email"].border,
            color: colors.text,
            backgroundColor,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={form[name]}
        onChangeText={(text) => handleChange(name, text)}
      />
      {errors[name as "name" | "email"].value && (
        <SlideIn direction="down" offset={10}>
          <TranslatedText
            value={errors[name as "name" | "email"].value as string}
            style={styles.errorText}
          />
        </SlideIn>
      )}
    </View>
  );

  // Función auxiliar para renderizar el input de contraseña
  const renderPasswordInput = (
    label: string,
    name: "password" | "confirmPassword",
    placeholder: string
  ) => {
    const errorData = errors[name] as any;

    return (
      <View>
        {label && <TranslatedText value={label} />}
        <PasswordInput
          style={[styles.input, { borderColor: errorData?.border }]}
          placeholder={placeholder}
          value={(form as any)[name]}
          onChangeText={(text) => handleChange(name as any, text)}
        />
        {errorData.value && (
          <>
            {(Array.isArray(errorData.value)
              ? errorData.value
              : [errorData.value]
            ).map((errMsg: string, index: number) => (
              <SlideIn direction="down" offset={10} key={`${name}-${index}`}>
                <TranslatedText value={errMsg} style={styles.errorText} />
              </SlideIn>
            ))}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* campo de nombre */}
      {renderTextInput("name", "name", "Satoshi Nakamoto", "default", "words")}

      {/* campo de correo electrónico */}
      {renderTextInput(
        "email",
        "email",
        "satoshi@nakamoto.com",
        "email-address",
        "none"
      )}

      <View style={{ gap: 20 }}>
        {/* Campo de contraseña */}
        {renderPasswordInput("password", "password", t("passwordPlaceholder"))}

        {/* Campo de confirmar contraseña */}
        {renderPasswordInput(
          "",
          "confirmPassword",
          t("confirmPasswordPlaceholder")
        )}
      </View>

      {/* Botón de enviar */}
      <Button
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={isLoading}
        shadow={false}
      >
        <TranslatedText
          value={isLoading ? "creating" : "createAccount"}
          style={{ color: "white" }}
        />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    fontSize: 16,
    fontWeight: "200",
    padding: 10,
    paddingHorizontal: 12,
  },
  button: {
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
    backgroundColor: "#9b2c2cff",
  },
  errorText: {
    color: "#9b2c2cff",
    fontSize: 14,
    opacity: 1,
    marginTop: 4,
    paddingLeft: 4,
  },
});
