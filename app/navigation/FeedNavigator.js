import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import Header from "../components/Header";

import styleConfig from "../config/styles";
import routes from "./routes";
import AuthNavigator from "./AuthNavigator";

const { colors, shadow } = styleConfig;

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: "modal",
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.MOVIES} component={HomeScreen} />
    <Stack.Screen name={routes.MOVIE_DETAILS} component={MovieScreen} />
    <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} />
  </Stack.Navigator>
);

export default FeedNavigator;
