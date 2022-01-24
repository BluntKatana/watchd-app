import React from "react";
import routes from "../../navigation/routes";
import VerticalPosterList from "../Lists/PosterListVertical";

function MovieRecommendations({ navigation, recommendations, ...otherProps }) {
  return (
    <VerticalPosterList
      data={recommendations}
      paddingHorizontal={20}
      onPress={(id) => navigation.push(routes.MOVIE_DETAILS, id)}
      {...otherProps}
    />
  );
}

export default MovieRecommendations;
