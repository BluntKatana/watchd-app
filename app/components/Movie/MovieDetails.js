import React from "react";
import { View, StyleSheet, Text } from "react-native";

import MovieCast from "./MovieCast";
import MovieProviders from "./MovieProviders";
import colors from "../../config/colors";
import { HeaderText, MediumText } from "../Text";

const convertTime = (n) => `${(n / 60) ^ 0} u ${("0" + (n % 60)).slice(-2)} m`;

function MovieDetails({ movieInformation }) {
  const allInformation = [
    {
      title: "Overview",
      visible: movieInformation.movieDetails.overview,
      subTitle: movieInformation.movieDetails.overview,
    },
    {
      title: "Duration",
      visible: movieInformation.movieDetails.runtime,
      subTitle: convertTime(movieInformation.movieDetails.runtime),
    },
    {
      title: "Cast",
      visible: movieInformation.castDetails.cast.length > 0,
      component: (
        <MovieCast
          cast={movieInformation.castDetails.cast.slice(0, 10)}
          paddingLeft={20}
          marginTop={10}
        />
      ),
    },
    {
      title: "Where to watchd?",
      visible: movieInformation.providerDetails?.results?.US?.flatrate,
      component: (
        <MovieProviders
          providers={movieInformation.providerDetails?.results?.US?.flatrate}
          paddingLeft={20}
          marginTop={10}
        />
      ),
    },
  ];

  return (
    <>
      <View style={{ marginTop: -10 }} />
      {allInformation.map((item) => (
        <TitleDescription
          title={item.title}
          description={item.subTitle}
          Comp={item.component}
          visible={item.visible}
          key={item.title}
        />
      ))}
      <View style={{ marginBottom: 20 }} />
    </>
  );
}

function TitleDescription({ title, visible, description, Comp }) {
  if (!visible) return null;

  if (Comp)
    return (
      <>
        <HeaderText style={styles.header}>{title}</HeaderText>
        {Comp}
      </>
    );

  return (
    <>
      <HeaderText style={styles.header}>{title}</HeaderText>
      <MediumText style={{ marginHorizontal: 20 }}>{description}</MediumText>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default MovieDetails;
