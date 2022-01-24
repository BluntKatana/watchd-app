import React from "react";
import { View, StyleSheet } from "react-native";
import FadeInOut from "react-native-fade-in-out";
import colors from "../config/colors";
import { MediumText } from "./Text";

function PopUp({ message, visible }) {
  return (
    <FadeInOut visible={visible} duration={1000}>
      <View style={styles.container}>
        <MediumText numberOfLines={3} style={{ textAlign: "center" }}>
          {message}
        </MediumText>
      </View>
    </FadeInOut>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "20%",
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
    zIndex: 999,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",

    padding: 10,
    backgroundColor: colors.light,
    borderRadius: 15,
  },
});

export default PopUp;
