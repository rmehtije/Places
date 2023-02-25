import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import MapScreen from "./MapScreen";
import MarkerScreen from "./MarkerScreen";

const options = {
  headerShown: false,
};

export default [
  {
    options,
    name: "Login",
    component: LoginScreen,
  },
  {
    options,
    name: "Map",
    component: MapScreen,
  },
  {
    options,
    name: "Home",
    component: HomeScreen,
  },
  {
    options,
    name: "Marker",
    component: MarkerScreen,
  }
];
