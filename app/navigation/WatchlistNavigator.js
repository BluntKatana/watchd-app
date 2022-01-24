import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MovieScreen from "../screens/MovieScreen";
import WatchListScreen from "../screens/WatchListScreen";
import AuthNavigator from "./AuthNavigator";

import routes from "./routes";

const Stack = createStackNavigator();

const WatchlistNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: "modal",
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.WATCHLIST} component={WatchListScreen} />
    <Stack.Screen name={routes.MOVIE_DETAILS} component={MovieScreen} />
    <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} />
  </Stack.Navigator>
);

export default WatchlistNavigator;
