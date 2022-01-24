import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import { useUser } from "../../Providers/userContext";
import Button from "../Button";

function MovieButtons({ style, movieId, movieReview, setModalVisible }) {
  const { addToWatchlist, removeFromWatchlist, watchlistContains, userData } =
    useUser();

  const handleAdd = () => {
    if (userData) {
      addToWatchlist(movieId);
    } else {
      console.log("Not logged in");
    }
  };
  const handleDelete = () => removeFromWatchlist(movieId);
  const handleReview = () => {
    if (userData) {
      setModalVisible(true);
    } else {
      console.log("Not logged in");
    }
  };

  const reviewButtons = () =>
    movieReview ? (
      <Button
        style={styles.button}
        fontStyle={styles.watchlistFont}
        color={"title"}
        onPress={handleReview}
        title="Edit your review"
      />
    ) : (
      <Button
        style={styles.button}
        fontStyle={styles.watchlistFont}
        color={"title"}
        onPress={handleReview}
        title="Check-in"
      />
    );

  if (!movieReview)
    return (
      <View style={style}>
        {reviewButtons()}
        {watchlistContains(movieId) ? (
          <Button
            style={styles.button}
            fontStyle={styles.watchedFont}
            color={"white"}
            onPress={handleDelete}
            title="Delete from watchlist"
          />
        ) : (
          <Button
            style={styles.button}
            fontStyle={styles.watchedFont}
            color={"white"}
            onPress={handleAdd}
            title="Add to watchlist"
          />
        )}
      </View>
    );

  return <View style={style}>{reviewButtons()}</View>;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  watchedFont: {
    fontSize: 12,
    color: colors.black,
  },
  watchlistFont: {
    fontSize: 12,
  },
});

export default MovieButtons;
