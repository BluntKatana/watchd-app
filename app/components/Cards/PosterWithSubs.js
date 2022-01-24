import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../../config/colors";
import { SmallText } from "../Text";

function PosterWithSubs({
  posterUrl,
  onPress,
  width = "100%",
  height = "100%",
  title,
  subTitle,
}) {
  if (posterUrl)
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <ImageBackground
          source={{
            uri: posterUrl,
          }}
          imageStyle={{ opacity: 1 }}
          style={[styles.card, { width, height }]}
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={colors.gradient_transparent}
          >
            {!isEmpty(title) && (
              <SmallText numberOfLines={1} style={{ fontWeight: "bold" }}>
                {title}
              </SmallText>
            )}
            {!isEmpty(subTitle) && (
              <SmallText numberOfLines={1}>{subTitle}</SmallText>
            )}
          </LinearGradient>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  return null;
}

function isEmpty(str) {
  return !str || str.length === 0;
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  linearGradient: {
    flex: 1,
    zIndex: 1,
    padding: 5,
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
  },
});

export default PosterWithSubs;
