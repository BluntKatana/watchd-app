import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import moviesApi from "../api/movies";
import Screen from "../components/Screen";
import { useUser } from "../Providers/userContext";
import routes from "../navigation/routes";
import Header from "../components/Header";
import colors from "../config/colors";
import NotLoggedIn from "../components/NotLoggedIn";
import MovieCardList from "../components/Lists/MovieCardList";
import { HeaderText, MediumText } from "../components/Text";

function WatchListScreen({ navigation }) {
  const { userData } = useUser();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (userData) getAllMovieDetails();
  }, [userData?.watchlist.length]);

  const getAllMovieDetails = async () => {
    setWatchlist([]);
    await Promise.all(
      userData.watchlist.map((id) => moviesApi.getMovieDetails(id))
    ).then((res) => setWatchlist(res.map((movie) => movie.data)));
  };

  if (!userData)
    return (
      <View style={styles.center}>
        <NotLoggedIn
          message="Log in to make a watchlist!"
          screen={routes.LOGIN}
          navigation={navigation}
        />
      </View>
    );

  return (
    <Screen>
      <Header />
      <HeaderText style={styles.text}>Watchlist</HeaderText>
      {userData?.watchlist.length > 0 ? (
        <MovieCardList
          data={watchlist}
          navigation={navigation}
          paddingHorizontal={20}
        />
      ) : (
        <MediumText style={styles.text}>
          Your watchlist is empty. Add some movies!
        </MediumText>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default WatchListScreen;
