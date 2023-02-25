import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@env";

const viewMessage = {
  loading: "We are gathering your location data",
  error: "Permission to access location was denied",
};

const MapScreen = ({ route, navigation }) => {
  const [message, setMessage] = React.useState(viewMessage.loading);
  const [location, setLocation] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [directions, setDirections] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setMessage(viewMessage.error);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  React.useEffect(() => {
    if (route.params) {
      setMarkers([...markers, route.params]);
    }
  }, [route.params]);

  const handleOnMapPress = ({ nativeEvent }) => {
    navigation.navigate("Marker", {
      latitude: nativeEvent.coordinate.latitude,
      longitude: nativeEvent.coordinate.longitude,
    });
  };

  return (
    <>
      {location ? (
        <View>
          <MapView
            style={styles.map}
            showsUserLocation
            followsUserLocation
            onPress={handleOnMapPress}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {!!markers.length &&
              markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.pinTitle}
                  description={marker.pinDescription}
                  pinColor={marker.selectedColor}
                  // icon={} // for icons
                  onPress={() => setSelectedMarker(marker)}
                />
              ))}
            {directions && (
              <MapViewDirections
                origin={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                destination={{
                  latitude: directions.latitude,
                  longitude: directions.longitude,
                }}
                apikey={GOOGLE_API_KEY}
                strokeWidth={4}
                strokeColor="#111111"
              />
            )}
          </MapView>
          {selectedMarker && (
            <Callout style={styles.buttonDirections}>
              <Button
                title="Directions"
                onPress={() => setDirections(selectedMarker)}
              />
            </Callout>
          )}
        </View>
      ) : (
        <View style={styles.container} behavior="padding">
          <Text>{message}</Text>
        </View>
      )}
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  buttonDirections: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
