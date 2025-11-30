import { useTranslation } from "@/context/LanguageContext";
import { useLoginForm } from "@/hooks/auth/use-login-form";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { SlideIn } from "../animation/slide-in";
import { Input, PasswordInput } from "../forms/input";
import { TranslatedText } from "../translated-text";
import { Button } from "../ui/button";

export default function LoginForm() {
  const { colors } = useTheme();
  const t = useTranslation();

  const { form, errors, isLoading, handleChange, handleLogin } = useLoginForm();

  const backgroundColor = useThemeColor(
    { light: "#f7f7f7ff", dark: "#111111ff" },
    "background"
  );

  const renderTextInput = (
    label: string,
    name: "email",
    placeholder: string,
    keyboardType: "default" | "email-address" = "default",
    autoCapitalize: "none" | "words" = "words"
  ) => (
    <View>
      <TranslatedText value={label} />
      <Input
        style={{
          borderColor: errors[name].border,
          color: colors.text,
          backgroundColor,
        }}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={form[name]}
        onChangeText={(text) => handleChange(name, text)}
      />
      {errors[name].value && (
        <SlideIn direction="down" offset={10}>
          <TranslatedText value={errors[name].value} style={styles.errorText} />
        </SlideIn>
      )}
    </View>
  );

  // Función auxiliar para renderizar el input de contraseña
  const renderPasswordInput = (
    label: string,
    name: "password",
    placeholder: string
  ) => {
    const errorData = errors[name];

    return (
      <View>
        <TranslatedText value={label} />
        <PasswordInput
          style={{ borderColor: errorData.border }}
          placeholder={placeholder}
          value={form[name]}
          onChangeText={(text) => handleChange(name, text)}
        />
        {errorData.value && (
          <SlideIn direction="down" offset={10}>
            <TranslatedText value={errorData.value} style={styles.errorText} />
          </SlideIn>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Campo de correo electrónico */}
      {renderTextInput(
        "email",
        "email",
        "satoshi@nakamoto.com",
        "email-address",
        "none"
      )}

      {/* Campo de contraseña */}
      {renderPasswordInput("password", "password", t("passwordPlaceholder"))}

      {/* Botón de enviar  */}
      <Button
        style={[
          styles.button,
          isLoading && styles.buttonDisabled,
          { elevation: 0 },
        ]}
        onPress={handleLogin}
        disabled={isLoading}
        shadow={false}
      >
        <TranslatedText
          value={isLoading ? "loading" : "submit"}
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
    fontWeight: "400",
    marginTop: 4,
    paddingLeft: 4,
  },
});
