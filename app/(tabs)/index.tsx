import { MeetingMap } from "@/components/home/meeting-map";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MeetingMap style={styles.mapMeeting} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 0,
    // borderRadius: 25,
    // overflow: "hidden",
  },
  mapMeeting: {
    height: "100%",
    width: "100%",
  },
});
