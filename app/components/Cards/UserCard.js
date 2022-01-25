import React from "react";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styleConfig from "../../config/styles";
import Icon from "../Icon";
import { TitleText } from "../Text";

const { colors, shadow } = styleConfig;

function UserCard({ user }) {
  return (
    <View style={[styles.card, { flex: 1 }]}>
      <LinearGradient
        style={styles.linearGradient}
        colors={colors.gradient}
        locations={colors.gradient_locations}
      >
        <View style={styles.logoContainer}>
              <Image source={{ uri: user.picture }} />
        </View>
        
        <View style={styles.detailsContainer}>
          <TitleText numberOfLines={3}>{user.name}</TitleText>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    marginBottom: 20,
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
});

export default UserCard;
