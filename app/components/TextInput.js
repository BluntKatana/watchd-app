import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({
  icon,
  iconPack = "MCI",
  width = "100%",
  size = 20,
  backgroundColor = defaultStyles.colors.secondary,
  shadow = false,
  marginVertical = 20,
  padding = 15,
  ...otherProps
}) {
  const ShowIcon = () => {
    switch (iconPack) {
      case "FA":
        return (
          <FontAwesome
            name={icon}
            size={size}
            color={defaultStyles.colors.white}
            style={styles.icon}
          />
        );
      default:
        return (
          <MaterialCommunityIcons
            name={icon}
            size={size}
            color={defaultStyles.colors.white}
            style={styles.icon}
          />
        );
    }
  };
  return (
    <View
      style={[
        styles.container,
        { width, backgroundColor, marginVertical, padding },
      ]}
    >
      {icon && ShowIcon()}
      <TextInput
        placeholderTextColor={defaultStyles.colors.grey}
        style={[defaultStyles.regularText, styles.textInput]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});

export default AppTextInput;
