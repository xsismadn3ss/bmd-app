import { ThemedText } from "@/components/themed-text";
import { TranslatedText } from "@/components/translated-text";
import { Button } from "@/components/ui/button";
import { DraggableBottomSheet } from "@/components/ui/draggable-bottom-sheet";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LanguageContext";
import { useModal } from "@/hooks/use-modal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CardOption } from "../settings-card";

export function LogoutOption() {
  const t = useTranslation();
  const { openModal, closeModal, isVisible } = useModal();
  const { logout } = useAuth();
  const router = useRouter();
  const headerHeight = 400;

  const handleLogout = () => {
    logout();
    closeModal();
    router.replace("/(auth)/sign-in-up");
  };

  return (
    <>
      {/* Opción */}
      <CardOption>
        <TouchableOpacity style={styles.option} onPress={openModal}>
          <ThemedText style={styles.text}>{t("logout")}</ThemedText>
          <MaterialIcons
            name="logout"
            size={24}
            color={"red"}
            style={styles.icon}
          />
        </TouchableOpacity>
      </CardOption>
      {/* Drawer */}
      <DraggableBottomSheet
        isVisible={isVisible}
        onClose={closeModal}
        headerHeight={headerHeight}
      >
        <ThemedText style={styles.modalTitle}>{t("logoutQuestion")}</ThemedText>
        <View style={styles.row}>
          <Button type="secondary" onPress={handleLogout} shadow={false}>
            <TranslatedText value="yes" />
          </Button>
          <Button type="secondary" onPress={closeModal} shadow={false}>
            <TranslatedText value="no" style={styles.no} />
          </Button>
        </View>
      </DraggableBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    opacity: 0.9,
  },
  text: {
    color: "red",
    fontWeight: "600",
    opacity: 0.9,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.8,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  no: {
    color: "red",
    opacity: 0.8,
  },
});
