import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

function MediumText({ children, style, onPress, ...otherProps }) {
  if (onPress)
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, style]} {...otherProps}>
          {children}
        </Text>
      </TouchableOpacity>
    );

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

export default MediumText;
