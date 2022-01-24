import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { useAuth } from "../Providers/authContext";
import ActivityIndicator from "./ActivityIndicator";

function Screen({ children, style }) {
  const { loadingUser } = useAuth();

  return (
    <SafeAreaView style={[styles.screen, style]}>
      <StatusBar style="light" />
      <ActivityIndicator visible={loadingUser} />
      {!loadingUser && <View style={[styles.view, style]}>{children}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
