import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import useApi from "../hooks/useApi";
import moviesApi from "../api/movies";
import { useUser } from "../Providers/userContext";
import colors from "../config/colors";
import routes from "../navigation/routes";

import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import PosterList from "../components/Lists/PosterList";
import LogoHeader from "../components/Header";
import NotLoggedIn from "../components/NotLoggedIn";
import MovieCardList from "../components/Lists/MovieCardList";
import PopUp from "../components/PopUp";
import { HeaderText, MediumText } from "../components/Text";
import { useAuth } from "../Providers/authContext";
import * as db from "../api/database";

function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState("");
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userData } = useUser();
  const { user } = useAuth();

  const getPopularMoviesApi = useApi(moviesApi.getPopular);

  useEffect(() => {
    console.log("HomeScreen.js - userEffect");
    getPopularMoviesApi.request();
    setFeed([]);
    setAllMovieDetails();
  }, [user]);

  const setAllMovieDetails = async () => {
    setLoading(true);

    if (user) {
      console.log("HomeScreen.js - setAllMovieDetails");
      const res = await db.getReviewsAndUserInfoFromArray(userData.following);

      const uniqueMovieIds = [
        ...new Set(res.followingReviewsFromDB.map((r) => r.review.movieId)),
      ];
      moviesApi
        .setArrayOfMovieIds(uniqueMovieIds, setFeed)
        .then(() => setRefreshing(false));
    }
    setLoading(false);
  };

  const handlePopUp = (showPopup, message) => {
    setShowPopup(showPopup);
    setMessagePopUp(message);

    // time for the popup to be visible
    setTimeout(() => {
      setShowPopup(!showPopup);
    }, 3000);
  };

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading} />
      <MovieCardList
        data={feed}
        navigation={navigation}
        showWatchlist
        setVisiblePopUp={handlePopUp}
        onRefresh={() => setAllMovieDetails()}
        refreshing={refreshing}
        Header={
          <HomeScreenHeader
            dataPopularMovies={getPopularMoviesApi.data.results}
            navigation={navigation}
            userData={userData}
          />
        }
      />
      <PopUp message={messagePopUp} visible={showPopup} />
    </Screen>
  );
}

function HomeScreenHeader({ dataPopularMovies, navigation, userData }) {
  return (
    <View>
      <LogoHeader />
      <HeaderText style={styles.header}>Popular</HeaderText>
      <PosterList
        data={dataPopularMovies}
        onPress={(id) => navigation.navigate(routes.MOVIE_DETAILS, id)}
        paddingLeft={20}
      />
      <HeaderText style={styles.header}>Your friends watchd</HeaderText>
      {!userData && (
        <View style={{ paddingHorizontal: 20 }}>
          <NotLoggedIn
            title="Login"
            message="Login to see what your friends are watching!"
            screen={routes.LOGIN}
            navigation={navigation}
          />
          <MediumText style={styles.error}>
            Please sign up or login to watch your friends activity!
          </MediumText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    marginLeft: 20,
  },
  error: {
    textAlign: "center",
    color: colors.white,
    marginTop: -10,
  },
});

export default HomeScreen;
