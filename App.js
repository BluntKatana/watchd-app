import React from "react";
import { View, StyleSheet, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import colors from "./app/config/colors";
import AppNavigator from "./app/navigation/AppNavigator";
import RootProvider from "./app/Providers/Providers";

// Removes timer log (not fixed yet?)
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer theme={navigationTheme}>
        <RootProvider>
          <AppNavigator />
        </RootProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
    backgroundColor: colors.primary,
  },
});
