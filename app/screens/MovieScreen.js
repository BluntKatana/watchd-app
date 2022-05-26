import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { useUser } from "../Providers/userContext";
import ActivityIndicator from "../components/ActivityIndicator";
import {
  MHeader,
  MDetails,
  MRecommendations,
  MButtons,
  MReviewModal,
  MReviews,
} from "../components/Movie";
import Screen from "../components/Screen";
import Tabs from "../components/Tabs";
import movies from "../api/movies";

function MovieScreen({ route, navigation }) {
  const { userData, getMovieReview, getFollowingMovieReviews } = useUser();
  const [activeTab, setActiveTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [movieInformation, setMovieInformation] = useState({});
  const [movieReview, setMovieReview] = useState({});
  const [followingReviews, setFollowingReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const movieId = route.params;

  useEffect(() => {
    movies.getMovieInformation(movieId, setMovieInformation, setLoading);
    setMovieReview(getMovieReview(movieId));
    getFollowingMovieReviews(setFollowingReviews, movieId);
  }, []);

  useEffect(() => {
    setMovieReview(getMovieReview(movieId));
  }, [getMovieReview(movieId)]);

  const tabItems = ["Details", "Reviews"];
  if (movieInformation.recommendationDetails?.results.length > 0)
    tabItems.push("Recommended");

  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <>
          <MReviewModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            movieReview={movieReview}
            movieId={movieId}
          />
          <ScrollView>
            <MHeader
              movie={movieInformation.movieDetails}
              userVisible={userData}
            />
            <View>
              <MButtons
                style={styles.buttoncontainer}
                movieId={movieId}
                movieReview={movieReview}
                setModalVisible={setModalVisible}
                navigation={navigation}
              />
              <Tabs
                tabItems={tabItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {activeTab == 0 && (
                <MDetails movieInformation={movieInformation} />
              )}
              {activeTab == 1 && (
                <MReviews
                  followingReviews={followingReviews}
                  userReview={movieReview}
                  user={userData}
                />
              )}
              {activeTab == 2 && (
                <MRecommendations
                  recommendations={movieInformation.recommendationDetails.results.slice(
                    0,
                    8
                  )}
                  navigation={navigation}
                />
              )}
            </View>
          </ScrollView>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "center",
    zIndex: -1,
    marginTop: 10,
  },
  movieDetails: {
    marginHorizontal: 20,
  },
});

export default MovieScreen;
