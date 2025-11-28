import { Container } from "@/components/container";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function ProfileScreen() {
  const cardDark = "#1d1d1dff";

  return (
    <ThemedView style={styles.container}>
      <Container maxWidth={700}>
        <ThemedView darkColor={cardDark} style={styles.card}>
          <ThemedText style={styles.nameText}>Sathosi Nakamoto</ThemedText>
          <ThemedText style={styles.emailText}>
            satoshi@example.email
          </ThemedText>
        </ThemedView>
      </Container>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBlock: 20,
    flex: 1,
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontWeight: "bold",
  },
  emailText: {
    fontWeight: "200",
  },
});
