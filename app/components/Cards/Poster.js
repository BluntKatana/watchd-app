import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

function Poster({
  posterUrl,
  onPress,
  width = "100%",
  height = "100%",
  morePoster,
  iconName,
  ...otherProps
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, { width, height }]} {...otherProps}>
        <Image uri={posterUrl} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
});

export default Poster;
