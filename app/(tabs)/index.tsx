import { Container } from "@/components/container";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Container>
        <View style={styles.headerContainer}>
          <ThemedText>Bienvenido a Bitcoin Meetings</ThemedText>
          <HelloWave />
        </View>
      </Container>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center'
  },
  headerContainer: {
    flexDirection: "row",
    alignContent: "flex-start",
    width: "100%",
  },
});
