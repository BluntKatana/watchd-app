import React, { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import * as Yup from "yup";
import Constants from "expo-constants";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/Forms";
import routes from "../navigation/routes";
import Button from "../components/Button";
import { useAuth } from "../Providers/authContext";
import colors from "../config/colors";
import { getError } from "./../utils/errors";
import { MediumText, ErrorMessage } from "../components/Text";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(2).max(255).label("Username"),
  email: Yup.string().email().required().max(255).label("Email"),
  password: Yup.string().required().min(6).max(10000).label("Password"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
  //   "Must contain atleast 8 characters, One Uppercase, One Lowercase, One number and one special case Character"
  // )
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm password"),
});

const RegisterScreen = ({ route, navigation }) => {
  const { screen, message } = route.params;

  const displayMessage =
    screen == routes.REGISTER
      ? message
      : "Sign up to enjoy all the extra features!";

  const [errorMessage, setErrorMessage] = useState("");
  const { signUp } = useAuth();

  const handleSubmit = (user, { resetForm }) => {
    signUp(user.email, user.password, user.username).catch((error) =>
      setErrorMessage(getError(error.code))
    );
  };

  const textInputStyle = {
    marginVertical: 5,
    size: 20,
    fontSize: 15,
    padding: 8,
    backgroundColor: colors.secondary,
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
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
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField
              name="username"
              icon="account"
              placeholder="Username"
              shadow
              {...textInputStyle}
            />
            <FormField
              name="email"
              icon="email"
              placeholder="Email"
              shadow
              {...textInputStyle}
            />
            <FormField
              name="password"
              icon="key"
              placeholder="Fill in your password..."
              secureTextEntry
              shadow
              {...textInputStyle}
            />
            <FormField
              name="confirmPassword"
              icon="key"
              placeholder="Confirm password..."
              secureTextEntry
              shadow
              {...textInputStyle}
            />
            <ErrorMessage error={errorMessage} visible={errorMessage} />
            <View style={{ marginTop: 40 }}>
              <SubmitButton
                title="Sign up"
                color="white"
                style={styles.button}
                fontStyle={{ fontSize: 18, color: colors.black }}
              />
              <MediumText style={styles.text}>
                Already have an account?
              </MediumText>
              <Button
                title="Log in"
                color="title"
                gradient="blue_gradient"
                onPress={() => navigation.replace(routes.LOGIN)}
                style={styles.button}
                fontStyle={{ fontSize: 18 }}
              />
            </View>
          </Form>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header: {
    marginTop: Constants.statusBarHeight + 20,
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
    marginVertical: 5,
    marginHorizontal: 20,
    textAlign: "center",
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
