import React, { createContext, useContext, useState, useEffect } from "react";
import * as db from "../api/database";
import { db as firedb } from "../../firebase";
import { useAuth } from "./authContext";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [userReviews, setUserReviews] = useState([]);

  const { user } = useAuth();

  // Fill the userData from server on login and make sure it dissapears on log out
  useEffect(() => {
    console.log("userChange");
    const unsubscribe = retrieveUserInformation();

    return unsubscribe;
  }, [user]);

  async function retrieveUserInformation() {
    if (user) {
      await db.getUser(user.uid).then((userDataFromDB) => {
        setUserData(userDataFromDB);
      });

      await db.getUserReviews(user.uid).then((userReviewsFromDB) => {
        setUserReviews(userReviewsFromDB);
      });
      return;
    } else {
      setUserData(null);
      setUserReviews([]);
      return;
    }
  }

  // Add a movie to the watchlist of the currently logged in user
  function addToWatchlist(movieId) {
    db.addValueToUserArray("watchlist", user.uid, movieId);
    let newUserData = { ...userData };
    newUserData.watchlist = [...userData.watchlist, movieId];
    setUserData(newUserData);
  }

  // Remove a movie from the watchlist of the currently logged in user
  function removeFromWatchlist(id) {
    db.deleteValueFromUserArray("watchlist", user.uid, id);
    let newUserData = { ...userData };
    newUserData.watchlist = newUserData.watchlist.filter(
      (movie) => movie !== id
    );
    setUserData(newUserData);
  }

  // Check if the current user's watchlist includes a certain movie
  function watchlistContains(id) {
    return userData?.watchlist?.includes(id);
  }

  // Gets the user's review from a certain movie if it exists, if not return undefined
  function getMovieReview(movieId) {
    return userReviews?.find(
      (reviewObj) => reviewObj.review.movieId == movieId
    );
  }

  // Adds a new review from the current user
  function addReview(movieId, rating, description) {
    db.addMovieReview(user.uid, movieId, rating, description).then(
      (newReview) => {
        setUserReviews([...userReviews, newReview]);
        if (watchlistContains(movieId)) removeFromWatchlist(movieId);
      }
    );
  }

  // Removes a review with a certain firestore document Id
  function removeReview(docId) {
    db.removeMovieReview(docId).then(() => {
      setUserReviews(
        userReviews.filter((reviewObj) => reviewObj.docId != docId)
      );
    });
  }

  // Updates the rating and description from a specific review with a certain firestore document Id
  function updateReview(docId, rating, description) {
    db.updateMovieReview(docId, rating, description).then(() => {
      let newUserReviews = [...userReviews];
      const newReviewObj = userReviews.findIndex(
        (reviewObj) => reviewObj.docId == docId
      );

      newUserReviews[newReviewObj].review.description = description;
      newUserReviews[newReviewObj].review.rating = rating;

      setUserReviews(newUserReviews);
    });
  }

  // Follow the user with the given uid
  async function followUser(username) {
    const validUser = await db.doesUserExist(username);
    if (validUser) {
      db.addValueToUserArray("following", user.uid, validUser.uid);
      db.addValueToUserArray("followers", validUser.uid, user.uid);
      let newUserData = { ...userData };
      newUserData.following = [...userData.following, validUser.uid];
      setUserData(newUserData);
      return false;
    } else {
      return true;
    }
  }

  // Unfollow the user with the given uid
  function unfollowUser(uid) {
    db.deleteValueFromUserArray("following", user.uid, uid);
    db.deleteValueFromUserArray("followers", uid, user.uid);
    let newUserData = { ...userData };
    newUserData.following = newUserData.following.filter(
      (otherUid) => otherUid !== id
    );
    setUserData(newUserData);
  }

  const value = {
    addToWatchlist,
    removeFromWatchlist,
    watchlistContains,
    getMovieReview,
    addReview,
    removeReview,
    updateReview,
    userData,
    userReviews,
    user,
    followUser,
    unfollowUser,
  };

  // Wait for the userData to load until the rest of the app is loaded
  if (user)
    return (
      <UserContext.Provider value={value}>
        {userData && children}
      </UserContext.Provider>
    );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
