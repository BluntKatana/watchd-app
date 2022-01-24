import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";

import styleConfig from "../config/styles";

const { shadow } = styleConfig;

function Header(props) {
  return (
    <View style={[styles.container, shadow]}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    zIndex: 20,
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },
  // Logo stuff
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: 0.9,
  },
  logo: {
    width: 123,
    height: 20,
  },
});

export default Header;
