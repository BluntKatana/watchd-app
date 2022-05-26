import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../../config/colors";
import { HeaderText, MediumText } from "../Text";

function MovieReview({ user, review }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftColumn}>
          <Image style={styles.userPicture} source={{ uri: user.picture }} />
        </View>
        <View style={styles.middleColumn}>
          <HeaderText>{user.name}</HeaderText>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.leftColumn}>
          <HeaderText>{review.rating}</HeaderText>
        </View>
        <View style={styles.middleColumn}>
          <MediumText>{review.description}</MediumText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  header: {
    backgroundColor: colors.light,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    backgroundColor: colors.secondary,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  leftColumn: {
    width: "15%",
  },
  middleColumn: {
    width: "80%",
  },
  rightColumn: {
    width: "15%",
  },
  userPicture: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
});

export default MovieReview;
