import React from "react";
import { View, StyleSheet } from "react-native";

import routes from "../navigation/routes";

import Button from "./Button";

function NotLoggedIn({ message, screen, navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Login / Sign up"
        onPress={() =>
          navigation.navigate(routes.AUTH_NAVIGATOR, {
            message,
            screen,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NotLoggedIn;
