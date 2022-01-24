import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import FeedNavigator from "./FeedNavigator";
import styleConfig from "../config/styles";
import SearchNavigator from "./SearchNavigator";
import routes from "./routes";
import WatchlistNavigator from "./WatchlistNavigator";
import AccountNavigator from "./AccountNavigator";

const Tab = createMaterialBottomTabNavigator();

const { colors, shadow } = styleConfig;

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.FEED_TAB}
      barStyle={{
        backgroundColor: colors.secondary,
        shadow,
      }}
      activeColor={colors.title}
      shifting
    >
      <Tab.Screen
        name={routes.WATCHLIST_TAB}
        component={WatchlistNavigator}
        options={{
          tabBarLabel: "Watchlist",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="eye" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.FEED_TAB}
        component={FeedNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.SEARCH_TAB}
        component={SearchNavigator}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ACCOUNT_TAB}
        component={AccountNavigator}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={"account"} color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
