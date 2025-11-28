import { FadeIn } from "@/components/animation/fade-in";
import { MeetingMap } from "@/components/home/meeting-map";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FadeIn duration={300}>
        <MeetingMap style={styles.mapMeeting} />
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapMeeting: {
    height: "100%",
    width: "100%",
  },
});
