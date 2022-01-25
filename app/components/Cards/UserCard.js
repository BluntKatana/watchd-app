import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";

import styleConfig from "../../config/styles";
import { MediumText, TitleText } from "../Text";
import Icon from "../Icon";

const { colors, shadow } = styleConfig;

function UserCard({ user, unfollowUser, following = false }) {
  const handleDeleteUser = () => {
    console.log(user);
    if (following) {
      unfollowUser(user.uid);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.logoContainer}>
        <Image uri={user.picture} style={{ flex: 1 }} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.detailsContainer}>
          <TitleText numberOfLines={2}>{user.name}</TitleText>
          {following && (
            <TouchableOpacity onPress={handleDeleteUser}>
              <Icon name="close" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <MediumText>{`${user.following.length} following`}</MediumText>
          <MediumText>{`${user.followers.length} followers`}</MediumText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: "row",
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
  },
  text: {
    textAlign: "center",
    padding: 5,
    color: colors.white,
  },
});

export default UserCard;
