import { darkMapStyle, lightMapStyle } from "@/constants/meeting-map";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAppTheme } from "../../context/AppThemeContext";

const INITIAL_REGION = {
  latitude: 13.69294,
  longitude: -89.21817,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const SAMPLE_MARKER = {
  latitude: 13.7,
  longitude: -89.22,
  title: "Próxima Reunión 📌",
};

interface MeetingMapProps {
  style: StyleProp<ViewStyle>;
}

export function MeetingMap({ style }: MeetingMapProps) {
  const { colorScheme } = useAppTheme();

  const pinColor = colorScheme === "dark" ? "#FFB84D" : "#e28700";
  const mapStyle = colorScheme === "dark" ? darkMapStyle : lightMapStyle;
  const mapType =
    colorScheme === "dark" && Platform.OS === "android"
      ? "standard"
      : "standard";

  return (
    <View
      style={[
        style,
        {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
          borderWidth: colorScheme === "dark" ? 1 : 0,
          borderRadius: colorScheme === "dark" ? 20 : 0,
        },
        styles.mapContainer,
      ]}
    >
      <MapView
        key={colorScheme}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        mapType='standard'
        customMapStyle={mapStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
        scrollEnabled={true}
        zoomEnabled={true}
        userInterfaceStyle={colorScheme}
      >
        <Marker
          coordinate={{
            latitude: SAMPLE_MARKER.latitude,
            longitude: SAMPLE_MARKER.longitude,
          }}
          title={SAMPLE_MARKER.title}
          pinColor={pinColor}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    overflow: "hidden",
    borderColor: "#cccccc28",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
