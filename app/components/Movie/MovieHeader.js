import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";

import tmdb from "../../config/tmdb";
import Poster from "../Cards/Poster";
import { MediumText, SmallText, TitleText } from "../Text";
import colors from "../../config/colors";

function MovieHeader({ movie }) {
  const subsubTitle = `${movie.release_date?.slice(0, 4)}   ${movie.genres
    ?.map((gen) => gen.name)
    .join(" • ")}`;

  return (
    <>
      <ImageBackground
        source={{
          uri: `${tmdb.backdrop_url_high}${movie.backdrop_path}`,
        }}
        imageStyle={{ opacity: 0.8 }}
        style={styles.card}
      >
        <LinearGradient
          style={styles.linearGradient}
          colors={colors.gradient_transparent}
        >
          <View style={styles.posterContainer}>
            <Poster posterUrl={`${tmdb.poster_url_high}${movie.poster_path}`} />
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.detailsContainer}>
        <TitleText numberOfLines={3} style={{ textAlign: "center" }}>
          {movie.original_title}
        </TitleText>
        {movie.tagline !== "" && movie.tagline !== undefined && (
          <MediumText style={{ fontStyle: "italic" }} numberOfLines={2}>
            {`"${movie.tagline}"`}
          </MediumText>
        )}
        {movie.release_date !== "" && movie.release_date !== undefined && (
          <SmallText style={styles.subsubTitle} numberOfLines={1}>
            {subsubTitle}
          </SmallText>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    height: 300,
  },
  linearGradient: {
    padding: 10,
    paddingTop: Constants.statusBarHeight + 20,
    flex: 1,
    zIndex: 1,
  },
  posterContainer: {
    width: 120,
    height: 200,
  },
  poster: {
    flex: 0.3,
    height: "100%",
    borderRadius: 5,
  },
  // Caption styling
  detailsContainer: {
    marginTop: -20,
    zIndex: 999,
    flex: 0.7,
    marginLeft: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MovieHeader;
