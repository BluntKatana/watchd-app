import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { useUser } from "../../Providers/userContext";

function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const { followingReviews, followingInformation } = useUser();
  // const { getFriendReviews } = useUser();
  // useEffect(() => {
  //   getFriendReviews(movieReviews, setMovieReviews);
  //   console.log(movieReviews);
  // }, []);
  return <View></View>;
}

const styles = StyleSheet.create({});

export default MovieReviews;
