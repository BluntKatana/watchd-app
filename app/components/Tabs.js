import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import styleConfig from "../config/styles";
import { HeaderText } from "./Text";

const { colors } = styleConfig;

function Tabs({ tabItems, activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      {tabItems.map((item, index) => (
        <TouchableWithoutFeedback
          style={styles.tabitem}
          onPress={() => setActiveTab(index)}
          key={index}
          activeOpacity={0.5}
        >
          <HeaderText style={activeTab == index ? styles.activetab : null}>
            {item}
          </HeaderText>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  activetab: {
    borderBottomColor: colors.title,
    borderBottomWidth: 2,
  },
});

export default Tabs;
