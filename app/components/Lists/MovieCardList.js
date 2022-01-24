import React from "react";
import { FlatList } from "react-native";

import tmdb from "../../config/tmdb";
import routes from "../../navigation/routes";
import { useUser } from "../../Providers/userContext";
import Card from "../Cards/MovieCard";

function MovieCardList({
  data,
  navigation,
  Header = null,
  Footer = null,
  paddingHorizontal = 20,
  showWatchlist = false,
  setVisiblePopUp,
  ...otherProps
}) {
  const {
    watchlistContains,
    addToWatchlist,
    removeFromWatchlist,
    getMovieReview,
  } = useUser();

  const getIcon = (movieId) => {
    if (watchlistContains(movieId)) return "eye-off";

    if (getMovieReview(movieId)) return null;

    return "eye";
  };

  const getRating = (movieId) => {
    const reviewObj = getMovieReview(movieId);

    if (reviewObj) {
      return reviewObj.review.rating;
    }

    return null;
  };

  const handleIconPress = (movieId, movieName) => {
    if (watchlistContains(movieId)) {
      removeFromWatchlist(movieId);
      setVisiblePopUp(true, `${movieName} removed from watchlist`);
    } else {
      addToWatchlist(movieId);
      setVisiblePopUp(true, `${movieName} added to watchlist`);
    }
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        data={data}
        keyExtractor={(movie) => movie.id}
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        {...otherProps}
        renderItem={({ item }) => (
          <Card
            paddingHorizontal={paddingHorizontal}
            title={item.title}
            imageUrl={`${tmdb.backdrop_url}${item.backdrop_path}`}
            posterUrl={`${tmdb.poster_url}${item.poster_path}`}
            onPress={() => navigation.navigate(routes.MOVIE_DETAILS, item.id)}
            icon={showWatchlist ? getIcon(item.id) : null}
            onIconPress={() => handleIconPress(item.id, item.title)}
            rating={getRating(item.id)}
          />
        )}
      />
    </>
  );
}

export default MovieCardList;
