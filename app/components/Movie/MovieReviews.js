import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderText, MediumText } from "../Text";
import MovieReview from "./MovieReview";

function MovieReviews({ followingReviews, userReview, user }) {
  const {
    followingInformationFromDB: followerInfo,
    followingReviewsFromDB: followerReviews,
  } = followingReviews;

  const getUserInfo = (uid) =>
    followerInfo.find((userObj) => uid == userObj.uid);

  return (
    <View style={styles.container}>
      {userReview && (
        <>
          <HeaderText style={styles.header}>Your review</HeaderText>
          <MovieReview user={user} review={userReview.review}></MovieReview>
        </>
      )}
      <HeaderText style={styles.header}>Other reviews</HeaderText>
      {followerReviews.length == 0 ? (
        <MediumText>No reviews written</MediumText>
      ) : (
        followerReviews.map((e) => {
          const user = getUserInfo(e.review.uid);
          return <MovieReview key={user.uid} user={user} review={e.review} />;
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    marginVertical: 5,
  },
});

export default MovieReviews;
