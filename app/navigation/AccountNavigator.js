import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import AuthNavigator from "./AuthNavigator";
import AccountScreen from "../screens/AccountScreen";
import MovieScreen from "../screens/MovieScreen";
import FollowScreen from "../screens/FollowScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: "modal",
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
    <Stack.Screen name={routes.FOLLOW} component={FollowScreen} />
    <Stack.Screen name={routes.MOVIE_DETAILS} component={MovieScreen} />
    <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} />
  </Stack.Navigator>
);

export default AccountNavigator;
