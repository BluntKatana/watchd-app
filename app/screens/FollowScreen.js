import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";

import { useUser } from "../Providers/userContext";
import * as db from "../api/database";
import Screen from "../components/Screen";
import Tabs from "../components/Tabs";
import Header from "../components/Header";
import FollowUser from "./../components/FollowUser";
import UserCard from "../components/Cards/UserCard";

function FollowScreen({ navigation, route }) {
  const { userData, unfollowUser } = useUser();
  const [activeTab, setActiveTab] = useState(route.params.tab || 0);
  const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);

  useEffect(() => {
    const unsubscribe = getFollowInformation();
    return unsubscribe;
  }, []);

  useEffect(() => {
    getFollowInformation();
  }, [userData.followers, userData.following]);

  const getFollowInformation = async () => {
    const following = await Promise.all(
      userData.following.map((uid) => db.getUser(uid))
    );
    const followers = await Promise.all(
      userData.followers.map((uid) => db.getUser(uid))
    );

    setFollowingList(following);
    setFollowersList(followers);
  };

  const tabItems = ["Followers", "Following"];

  return (
    <Screen>
      <Header />
      <View style={styles.container}>
        <FollowUser />
        <Tabs
          tabItems={tabItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab == 0 && (
          <FollowersTab followers={followersList} unfollowUser={unfollowUser} />
        )}
        {activeTab == 1 && (
          <FollowingTab following={followingList} unfollowUser={unfollowUser} />
        )}
      </View>
    </Screen>
  );
}

function FollowingTab({ following, unfollowUser }) {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        data={following}
        keyExtractor={(user) => user.uid}
        renderItem={({ item }) => (
          <UserCard user={item} unfollowUser={unfollowUser} following />
        )}
      />
    </View>
  );
}

function FollowersTab({ followers }) {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        data={followers}
        keyExtractor={(user) => user.uid}
        renderItem={({ item }) => <UserCard user={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});

export default FollowScreen;
