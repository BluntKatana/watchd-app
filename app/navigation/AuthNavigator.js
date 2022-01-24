import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const AuthNavigator = ({ route }) => {
  const { screen } = route.params;

  return (
    <Stack.Navigator
      initialRouteName={screen}
      screenOptions={{
        presentation: "modal",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        initialParams={route.params}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        initialParams={route.params}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
