import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../../config/colors";

function SmallText({ children, style, ...otherProps }) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: colors.white,
  },
});

export default SmallText;
