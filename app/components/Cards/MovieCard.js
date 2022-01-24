import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import { LinearGradient } from "expo-linear-gradient";

import styleConfig from "../../config/styles";
import Icon from "../Icon";
import { TitleText } from "../Text";

const { colors, shadow } = styleConfig;

function Card({
  title,
  rating,
  imageUrl,
  posterUrl,
  onPress,
  icon,
  onIconPress,
  ...otherProps
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flex: 1, ...otherProps }}>
        <ImageBackground
          source={{ uri: imageUrl }}
          imageStyle={{ opacity: 0.8 }}
          style={styles.card}
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={colors.gradient}
            locations={colors.gradient_locations}
          >
            <Image style={styles.poster} uri={posterUrl} />

            <View style={styles.detailsContainer}>
              <View style={styles.icon}>
                {icon && (
                  <TouchableWithoutFeedback onPress={onIconPress}>
                    <View style={{ zIndex: 999 }}>
                      <Icon name={icon} />
                    </View>
                  </TouchableWithoutFeedback>
                )}
                {rating && <TitleText style={styles.text}>{rating}</TitleText>}
              </View>
              <TitleText numberOfLines={3}>{title}</TitleText>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    height: 160,
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  linearGradient: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  poster: {
    flex: 0.3,
    height: "100%",
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 0.7,
    marginLeft: 10,
    height: "100%",
    justifyContent: "space-between",
  },
  text: {
    textAlign: "center",
    padding: 5,
    color: colors.white,
  },
  icon: {
    alignSelf: "flex-end",
    justifyContent: "center",
  },
});

export default Card;
