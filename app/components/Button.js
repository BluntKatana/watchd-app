import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  gradient = "",
  fontStyle = {},
  style = {},
}) {
  if (!gradient)
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors[color], ...style }]}
        onPress={onPress}
      >
        <Text style={[styles.text, { ...fontStyle }]}>{title}</Text>
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...style }}
      activeOpacity={0.4}
    >
      <LinearGradient
        style={styles.button}
        colors={colors[gradient]}
        start={[0, 1]}
        end={[1, 0]}
      >
        <Text style={[styles.text, { ...fontStyle }]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AppButton;
