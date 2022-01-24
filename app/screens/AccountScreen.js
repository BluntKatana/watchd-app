import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import { useAuth } from "../Providers/authContext";
import { useUser } from "../Providers/userContext";
import Screen from "../components/Screen";
import Button from "./../components/Button";
import routes from "../navigation/routes";
import Header from "../components/Header";
import NotLoggedIn from "../components/NotLoggedIn";
import colors from "../config/colors";
import PosterList from "../components/Lists/PosterList";
import moviesApi from "../api/movies";
import {
  HeaderText,
  MediumText,
  SmallText,
  TitleText,
} from "../components/Text";
import ActivityIndicator from "../components/ActivityIndicator";
import FollowUser from "./../components/FollowUser";

function AccountScreen({ navigation }) {
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState();
  const { logOut } = useAuth();
  const { userData, userReviews } = useUser();

  useEffect(() => {
    if (userData) getAllMovieDetails();
  }, [userReviews]);

  const getAllMovieDetails = async () => {
    setLoading(true);
    setReviews([]);
    const res = await Promise.all(
      userReviews
        .slice(0, 10)
        .map((r) => moviesApi.getMovieDetails(r.review.movieId))
    );
    setReviews(
      res.map((movie, i) => ({
        movieInfo: movie.data,
        reviewInfo: userReviews[i],
      }))
    );
    setLoading(false);
  };
  if (userData) {
    return (
      <Screen style={styles.container}>
        <ScrollView>
          <Header />
          <AccountHeader
            userData={userData}
            userReviews={userReviews}
            navigation={navigation}
          />

          {reviews && (
            <>
              <ActivityIndicator visible={loading} />
              <HeaderText style={styles.header}>
                Recently watched movies
              </HeaderText>
              <View>
                <PosterList
                  data={reviews.map((r) => r.movieInfo) || []}
                  onPress={(id) =>
                    navigation.navigate(routes.MOVIE_DETAILS, id)
                  }
                  paddingLeft={20}
                />
              </View>
              <HeaderText style={styles.header}>
                Your top rated movies
              </HeaderText>
              <View>
                <PosterList
                  data={reviews.map((r) => r.movieInfo) || []}
                  onPress={(id) =>
                    navigation.navigate(routes.MOVIE_DETAILS, id)
                  }
                  paddingLeft={20}
                />
              </View>
            </>
          )}
          <Button title="Logout" onPress={() => logOut()}></Button>
        </ScrollView>
      </Screen>
    );
  }
  return (
    <Screen style={styles.container}>
      <Header />
      <NotLoggedIn
        title="Login"
        message="Login to get personalized recommendations and write reviews!"
        screen={routes.LOGIN}
        navigation={navigation}
      />
    </Screen>
  );
}

function AccountHeader({ userData, userReviews, navigation }) {
  const date = userData.createdAt.toDate().toDateString().slice(4, 16);
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.userPicture} source={{ uri: userData.picture }} />
      <TitleText style={styles.userName}>{userData.name}</TitleText>
      <SmallText>{`Watching since ${date}`}</SmallText>
      <View style={styles.underline} />
      <View style={styles.userDetails}>
        <MediumText>
          <Strong>{userReviews?.length}</Strong>watchd movies
        </MediumText>
        <MediumText
          onPress={() => navigation.navigate(routes.FOLLOW, { tab: 0 })}
        >
          <Strong>{userData.followers.length}</Strong>followers
        </MediumText>
        <MediumText
          onPress={() => navigation.navigate(routes.FOLLOW, { tab: 1 })}
        >
          <Strong>{userData.following.length}</Strong>
          following
        </MediumText>
      </View>
    </View>
  );
}

const Strong = (props) => (
  <MediumText style={{ fontWeight: "bold" }}>{props.children} </MediumText>
);

const styles = StyleSheet.create({
  // AccountScreen
  container: {
    // alignItems: "center",
    // justifyContent: "center",
  },
  // AccountHeader
  headerContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  userPicture: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    textTransform: "capitalize",
  },
  userDate: {
    marginTop: 5,
    fontSize: 12,
    color: colors.white,
  },
  underline: {
    width: "20%",
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  userDetails: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  text: {
    color: colors.white,
    fontSize: 14,
  },
  header: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default AccountScreen;
