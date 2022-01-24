import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import * as Yup from "yup";
import Constants from "expo-constants";
import { getError } from "../utils/errors";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/Forms";
import routes from "../navigation/routes";
import Button from "../components/Button";
import { useAuth } from "../Providers/authContext";
import ErrorMessage from "../components/Text/ErrorMessage";
import colors from "../config/colors";
import { MediumText } from "../components/Text";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").min(6).label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(6)
    .max(10000)
    .label("Password"),
});

const LoginScreen = ({ route, navigation }) => {
  const { screen, message } = route.params;

  const displayMessage =
    screen == routes.LOGIN ? message : "Log in to get watchding!";

  const [errorMessage, setErrorMessage] = useState("");
  const { logIn } = useAuth();

  const handleSubmit = (user, { resetForm }) => {
    logIn(user.email, user.password)
      .then(() => navigation.goBack())
      .catch((error) => setErrorMessage(getError(error.code)));
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.image}
            />
          </View>
          <MediumText style={styles.text}>{displayMessage}</MediumText>
          <View style={styles.underline} />
        </View>

        <View style={styles.inputContainer}>
          <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField
              name="email"
              icon="email"
              placeholder="Enter your email adress..."
              backgroundColor={colors.secondary}
              shadow
              marginVertical={10}
              size={30}
            />
            <FormField
              name="password"
              icon="key"
              placeholder="Enter your password..."
              secureTextEntry
              backgroundColor={colors.secondary}
              shadow
              marginVertical={10}
              size={30}
            />
            <ErrorMessage error={errorMessage} visible={errorMessage} />
            <View style={{ marginTop: 40 }}>
              <SubmitButton
                title="Log in"
                color="title"
                gradient="blue_gradient"
                style={styles.button}
                fontStyle={{ fontSize: 18 }}
              />
              <MediumText style={styles.text}>
                Don't have an account yet?
              </MediumText>
              <Button
                title="Sign up"
                color="white"
                onPress={() => navigation.replace(routes.REGISTER)}
                style={styles.button}
                fontStyle={{ fontSize: 18, color: colors.black }}
              />
            </View>
          </Form>
        </View>
      </View>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: Constants.statusBarHeight + 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    width: 300,
    height: 30,
    marginBottom: 50,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  text: {
    marginHorizontal: 20,
    textAlign: "center",
    marginVertical: 5,
  },

  underline: {
    height: 10,
    width: "50%",
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    width: "80%",
    marginBottom: 30,
  },
});
