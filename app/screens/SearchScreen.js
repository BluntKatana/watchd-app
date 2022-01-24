import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";

import useApi from "../hooks/useApi";
import moviesApi from "../api/movies";

import Screen from "../components/Screen";
import Card from "../components/Cards/MovieCard";
import tmdb from "../config/tmdb";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import routes from "../navigation/routes";
import SearchBar from "./../components/SearchBar";
import Header from "../components/Header";
import VerticalPosterList from "../components/Lists/PosterListVertical";
import { HeaderText } from "../components/Text";

let stopFetchMore = true;

function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState(query);
  const [pageNum, setPageNum] = useState(1);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [stopFetchMore, setStopFetchMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const getSearchedMoviesApi = useApi(moviesApi.getSearchedMovies);
  const getPopularMoviesApi = useApi(moviesApi.getPopular);
  const getLatestMoviesApi = useApi(moviesApi.getLatest);

  useEffect(() => {
    getPopularMoviesApi.request();
    getLatestMoviesApi.request();
    resetSearch();
  }, []);

  // Optimize searching
  useEffect(() => {
    if (debounceQuery != query) {
      const timer = setTimeout(
        () => setQuery(debounceQuery.toLowerCase()),
        500
      );
      return () => clearTimeout(timer);
    }
  }, [debounceQuery]);

  useEffect(() => {
    getSearchedMovies();
  }, [query]);

  const getSearchedMovies = async () => {
    resetSearch();
    if (query != "") {
      const res = await getSearchedMoviesApi.request(query, 1);
      setSearchedMovies(res.data.results);
    }
  };

  const handleOnEndReached = async () => {
    if (pageNum < 5 && !stopFetchMore && query != "") {
      setLoadingMore(true);
      const res = await getSearchedMoviesApi.request(query, pageNum + 1);

      if (res.data.results.length > 0) {
        setSearchedMovies([...searchedMovies, ...res.data.results]);
      }
      setPageNum(pageNum + 1);
      setLoadingMore(false);
    }
  };

  const resetSearch = () => {
    setPageNum(1);
    setSearchedMovies([]);
    setStopFetchMore(true);
  };

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator
        visible={getSearchedMoviesApi.loading && stopFetchMore}
      />
      <View style={styles.searchbar}>
        <Header />
        <SearchBar
          onChange={setDebounceQuery}
          backgroundColor={colors.secondary}
          value={debounceQuery}
          onEndEditing={() => setQuery(debounceQuery)}
          placeholder="Search for movies to watch..."
          padding={10}
        />
      </View>
      {query == "" && (
        <ScrollView style={{ paddingVertical: 20 }}>
          <HeaderText style={styles.header}>Discover</HeaderText>
          <VerticalPosterList
            data={getPopularMoviesApi.data.results}
            paddingHorizontal={20}
            onPress={(id) => navigation.push(routes.MOVIE_DETAILS, id)}
            marginBottom={20}
          />
        </ScrollView>
      )}
      {query != "" && (
        <FlatList
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={searchedMovies}
          keyExtractor={(movie) => movie.id}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.7}
          onScrollBeginDrag={() => setStopFetchMore(false)}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              imageUrl={`${tmdb.backdrop_url}${item.backdrop_path}`}
              posterUrl={`${tmdb.poster_url}${item.poster_path}`}
              onPress={() => navigation.navigate(routes.MOVIE_DETAILS, item.id)}
            />
          )}
          ListFooterComponent={() =>
            loadingMore && (
              <HeaderText style={styles.loadingmore}>Loading...</HeaderText>
            )
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  loadingmore: {
    marginVertical: 10,
    textAlign: "center",
  },
  searchbar: {
    backgroundColor: "transparent",
    marginHorizontal: 20,
    marginBottom: -20,
  },
});

export default SearchScreen;
