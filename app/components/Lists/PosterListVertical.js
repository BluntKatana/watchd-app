import React from "react";
import { View, StyleSheet } from "react-native";

import tmdb from "../../config/tmdb";
import Poster from "../Cards/Poster";

function VerticalPosterList({
  data,
  width = "100%",
  height = 240,
  onPress,
  uriPath = "poster_path",
  gap = 20,
  ...otherProps
}) {
  if (!data) return null;

  return (
    <View style={[styles.container, { ...otherProps }]}>
      {data.map((item, index) => (
        <View
          key={`poster-${index}-${item.id}`}
          style={[
            styles.posterContainer,
            index % 2 == 1
              ? { paddingLeft: gap / 2 }
              : { paddingRight: gap / 2 },
            { marginBottom: gap },
          ]}
        >
          <Poster
            width={width}
            height={height}
            posterUrl={`${tmdb.poster_url_high}${item[uriPath]}`}
            onPress={() => onPress(item.id)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  posterContainer: {
    width: "50%",
  },
});

export default VerticalPosterList;
