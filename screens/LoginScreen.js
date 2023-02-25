import React from "react";
import { KeyboardAvoidingView, StyleSheet, View, Button } from "react-native";

import * as Google from "expo-auth-session/providers/google";
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from "@env";

const LoginScreen = ({ navigation }) => {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const expoClientId = `${GOOGLE_WEB_CLIENT_ID}`;
  const androidClientId = `${GOOGLE_ANDROID_CLIENT_ID}`;

  const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
    androidClientId,
    expoClientId,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      // setAccessToken(response.authentication.accessToken); // only in android apk
      // accessToken && fetchUserInfo();
      navigation.navigate("Map");
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Baerer ${accessToken}` },
    });
    const userinfo = await response.json();
    setUser(userinfo);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Button
          disabled={!request}
          title="Login"
          onPress={() => promtAsync()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
