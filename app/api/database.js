import { db } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

// Add a new user to the database
export async function addUser(uid, email, name) {
  const dbUser = {
    createdAt: serverTimestamp(),
    email,
    followers: [],
    following: [],
    username: name.toLowerCase(),
    name,
    picture: "https://picsum.photos/200/200",
    uid,
    watchlist: [],
  };

  await setDoc(doc(db, "Users", uid), dbUser);
  return dbUser;
}

// Get all the data from a user inside the Users collection
export async function getUser(uid) {
  const ref = doc(db, "Users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  } else return null;
}

// Get the review data from a user
export async function getUserReviews(uid) {
  const reviewRef = collection(db, "Reviews");
  const q = query(reviewRef, where("uid", "==", uid));
  const snap = await getDocs(q);

  let userReviews = [];

  snap.forEach((doc) => {
    if (doc.exists()) {
      const review = doc.data();
      userReviews.push({ review, docId: doc.id });
    }
  });

  return userReviews;
}

// Get all the reviews and information from its followers from the array which is entered
export async function getReviewsAndUserInfoFromArray(arr) {
  let followingReviewsFromDB = [];
  let followingInformationFromDB = [];
  if (arr?.length > 0) {
    // Gather the review information from all the uid's in the array
    const reviewRef = collection(db, "Reviews");
    const reviewQuery = query(reviewRef, where("uid", "in", arr));
    const reviewSnap = await getDocs(reviewQuery);

    reviewSnap.forEach((doc) => {
      if (doc.exists()) {
        const review = doc.data();
        followingReviewsFromDB.push({ review, docId: doc.id });
      }
    });

    // Gather the user information from all the uid's in the array
    const userRef = collection(db, "Users");
    const userQuery = query(userRef, where("uid", "in", arr));
    const userSnap = await getDocs(userQuery);

    userSnap.forEach((doc) => {
      if (doc.exists()) {
        const user = doc.data();
        followingInformationFromDB.push(user);
      }
    });
  }

  return { followingReviewsFromDB, followingInformationFromDB };
}

// Removes a user's review based on the movieId passed in
export async function removeMovieReview(docid) {
  const reviewRef = doc(db, "Reviews", docid);
  await deleteDoc(reviewRef);
}

// Adds a user review based on the movieId passed in and returns the review to
// be able to update the state easily
export async function addMovieReview(uid, movieId, rating, description) {
  const reviewRef = collection(db, "Reviews");
  const review = {
    createdAt: serverTimestamp(),
    description,
    likes: [],
    movieId,
    rating,
    uid,
  };

  const document = await addDoc(reviewRef, review);
  return { review, docId: document.id };
}

// Updates a user's review based on the docid passed in
export async function updateMovieReview(docid, rating, description) {
  const reviewRef = doc(db, "Reviews", docid);
  await updateDoc(reviewRef, { description, rating });
}

export async function doesUserExist(username) {
  const lowerUsername = username.toLowerCase();
  const userRef = collection(db, "Users");
  const userQuery = query(userRef, where("username", "==", lowerUsername));
  const snap = await getDocs(userQuery);

  let user = [];
  snap.forEach((doc) => {
    if (doc.exists()) {
      user.push(doc.data());
    }
  });

  if (user.length > 0) {
    return user[0];
  } else return false;
}

// Add a value to an array field in the Users collection
export async function addValueToUserArray(key, uid, value) {
  const ref = doc(db, "Users", uid);
  const obj = {};
  obj[key] = arrayUnion(value);
  await updateDoc(ref, obj);
}

// Remove a value from an array field in the Users collection
export async function deleteValueFromUserArray(key, uid, value) {
  const ref = doc(db, "Users", uid);
  const obj = {};
  obj[key] = arrayRemove(value);
  await updateDoc(ref, obj);
}
