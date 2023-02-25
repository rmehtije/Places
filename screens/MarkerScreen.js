import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

const pinColors = {
  green: "#00FF00",
  red: "#FF0000",
  yellow: "#FFFF00",
};

const MarkerScreen = ({ route, navigation }) => {
  const [selectedColor, setSelectedColor] = React.useState(pinColors.green);
  const [pinTitle, setPinTitle] = React.useState(null);
  const [pinDescription, setPinDescription] = React.useState(null);

  const { latitude, longitude } = route.params;

  const handleCreatePin = () => {
    if (!pinTitle || !pinDescription) return;

    navigation.navigate("Map", {
      ...route.params,
      selectedColor,
      pinTitle,
      pinDescription,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Create marker </Text>

      <Text> latitude: {latitude} </Text>
      <Text> longitude: {longitude} </Text>
      <View style={styles.full}>
        <Picker
          selectedValue={selectedColor}
          onValueChange={(itemValue, itemIndex) => setSelectedColor(itemValue)}
        >
          {Object.entries(pinColors).map(([pin, color]) => (
            <Picker.Item label={pin} value={color} key={pin} />
          ))}
        </Picker>
        <TextInput placeholder="Title" onChangeText={setPinTitle} />
        <TextInput placeholder="Description" onChangeText={setPinDescription} />
        <Button title="Create pin" onPress={handleCreatePin} />
      </View>
    </View>
  );
};

export default MarkerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  full: {
    width: '80%',
  }
});
