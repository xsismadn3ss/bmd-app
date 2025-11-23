import { Container } from "@/components/container";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const cardDark = "#1d1d1dff";

  return (
    <ThemedView style={styles.container}>
      <Container maxWidth={700}>
        <ThemedView darkColor={cardDark} style={styles.card}>
          <View style={styles.cardHeader}>
            <ThemedText style={styles.nameText}>Sathosi Nakamoto</ThemedText>

            <Link href={"/settings"}>
              <ThemedText lightColor="#494949ff" darkColor="#515151ff">
                <MaterialIcons name={"settings"} size={21} />
              </ThemedText>
            </Link>
          </View>
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
    alignItems: 'center'
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
