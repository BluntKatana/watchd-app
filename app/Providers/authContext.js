import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firebase } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { addUser } from "../api/database";

const AuthContext = createContext({
  user: firebase.currentUser,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  // Create a user and add it to the Users collection
  async function signUp(email, password, name) {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: name });
    const newUserData = await addUser(auth.currentUser.uid, email, name);
    console.log(newUserData);
    setUserData(newUserData);
  }

  // Log in a user
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Log out a user
  function logOut() {
    return signOut(auth);
  }

  // Reset a user's password
  function resetPassword(email) {
    auth.sendPasswordResetEmail(email);
  }

  // listen for token changes and call setUser
  useEffect(() => {
    setLoadingUser(true);
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
      } else {
        const token = await user.getIdToken();
        setUser(user);
      }
      setLoadingUser(false);
    });
  }, [user]);

  // force refresh the token every 10 minutes
  useEffect(() => {
    logOut();
    const handle = setInterval(async () => {
      setLoadingUser(true);
      const currentUser = auth.currentUser;
      if (currentUser) await currentUser.getIdToken(true);
      setLoadingUser(false);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  const value = {
    user,
    loadingUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
    userData,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
