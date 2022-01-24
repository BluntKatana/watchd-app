import React from "react";
import { FlatList, View } from "react-native";

import PosterWithSubs from "../Cards/PosterWithSubs";

function PosterListWithSubs({
  data,
  tmdbUrl,
  width = 100,
  height = 150,
  onPress,
  paddingLeft,
  uriPath = "poster_path",
  titleName,
  subTitleName,
}) {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      initialNumToRender={7}
      style={{ paddingLeft }}
      data={data}
      keyExtractor={(item) => item.id || item.provider_id}
      horizontal
      ListFooterComponent={<View style={{ paddingRight: paddingLeft }} />}
      renderItem={({ item, index }) => (
        <PosterWithSubs
          key={`poster-${index}-${item.id}`}
          width={width}
          height={height}
          posterUrl={`${tmdbUrl}${item[uriPath]}`}
          onPress={() => onPress(item.id)}
          title={item[titleName]}
          subTitle={item[subTitleName]}
          onPress={() => console.log(`This is ${item[titleName]}`)}
        />
      )}
    />
  );
}

export default PosterListWithSubs;
