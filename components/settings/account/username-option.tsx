import { ThemedText } from "@/components/themed-text";
import { useTranslation } from "@/context/LanguageContext";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { CardOption } from "../settings-card";

export function UsernameOption() {
  const t = useTranslation();
  const { colors } = useTheme();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("USER");
      if (data) setUsername(data);
    })();
  });

  return (
    <CardOption>
      <ThemedText>{username ? username : t("loading")}</ThemedText>
      <Feather
        name="user"
        size={24}
        color={colors.text}
        style={{ opacity: 0.5 }}
      />
    </CardOption>
  );
}
