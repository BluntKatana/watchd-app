import React from "react";
import { View } from "react-native";

import PosterListWithSubs from "../Lists/PosterListWithSubs";
import tmdb from "../../config/tmdb";

function MovieCast({ cast, ...styleProps }) {
  return (
    <View style={{ ...styleProps }}>
      <PosterListWithSubs
        data={cast}
        uriPath="profile_path"
        titleName="name"
        subTitleName="character"
        tmdbUrl={tmdb.poster_url}
      />
    </View>
  );
}

export default MovieCast;
