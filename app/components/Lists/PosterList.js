import React from "react";
import { FlatList, View } from "react-native";

import tmdb from "../../config/tmdb";
import Poster from "../Cards/Poster";

function PosterList({
  data,
  width = 100,
  height = 150,
  onPress,
  onMore,
  footerVisible = false,
  paddingLeft,
  uriPath = "poster_path",
}) {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      initialNumToRender={7}
      style={{ paddingLeft }}
      ListFooterComponent={
        <>
          {footerVisible && (
            <Poster
              morePoster
              width={width}
              height={height}
              iconName="arrow-right-thick"
              title="view more"
              onPress={onMore}
            />
          )}
          <View style={{ paddingRight: paddingLeft }} />
        </>
      }
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item, index }) => (
        <Poster
          key={`poster-${index}-${item.id}`}
          width={width}
          height={height}
          posterUrl={`${tmdb.poster_url}${item[uriPath]}`}
          onPress={() => onPress(item.id)}
        />
      )}
    />
  );
}

export default PosterList;
