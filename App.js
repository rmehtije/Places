import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { default as screens } from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((props, i) => (
          <Stack.Screen key={i} {...props} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
