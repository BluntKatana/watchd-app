import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";
import MovieScreen from "../screens/MovieScreen";
import AuthNavigator from "./AuthNavigator";

import routes from "./routes";

const Stack = createStackNavigator();

const SearchNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: "modal",
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.SEARCH} component={SearchScreen} />
    <Stack.Screen name={routes.MOVIE_DETAILS} component={MovieScreen} />
    <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} />
  </Stack.Navigator>
);

export default SearchNavigator;
