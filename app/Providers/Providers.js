import React from "react";
import { View, StyleSheet } from "react-native";
import { UserProvider } from "./userContext";
import { AuthProvider } from "./authContext";

function RootProvider({ children }) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default RootProvider;
