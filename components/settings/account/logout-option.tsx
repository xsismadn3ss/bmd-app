import { ThemedText } from "@/components/themed-text";
import { DraggableBottomSheet } from "@/components/ui/draggable-bottom-sheet";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LanguageContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CardOption } from "../settings-card";

export function LogoutOption() {
  const t = useTranslation();
  const { colors } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const headerHeight = 400;

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/sign-in-up");
  };

  return (
    <>
      {/* Opción */}
      <CardOption>
        <TouchableOpacity
          style={styles.option}
          onPress={() => setVisible(true)}
        >
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
        isVisible={visible}
        onClose={handleClose}
        headerHeight={headerHeight}
      >
        <ThemedText style={styles.modalTitle}>{t("logoutQuestion")}</ThemedText>
        <View style={styles.modalBtnContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
            onPress={handleLogout}
          >
            <ThemedText>{t("yes")}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
            onPress={handleClose}
          >
            <ThemedText style={styles.no}>{t("no")}</ThemedText>
          </TouchableOpacity>
        </View>
      </DraggableBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    opacity: 0.6,
  },
  text: {
    color: "red",
    opacity: 0.6,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  modalBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 30,
  },
  button: {
    elevation: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  no: {
    color: "red",
    opacity: 0.6,
  },
});
