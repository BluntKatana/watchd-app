import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../../config/colors";

function TitleText({ children, style, ...otherProps }) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    color: colors.title,
    fontWeight: "bold",
  },
});

export default TitleText;
