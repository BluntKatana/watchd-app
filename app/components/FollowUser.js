import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Button from "./Button";
import { useUser } from "../Providers/userContext";
import TextInput from "./TextInput";
import colors from "../config/colors";
import Icon from "./Icon";
import { ErrorMessage } from "./Text";

function FollowUser({ reload }) {
  const { userData, followUser } = useUser();
  const [userValue, setUserValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddUser = async () => {
    if (!userData?.following.includes(userValue) && userValue != "") {
      const invalidAction = await followUser(userValue);
      if (invalidAction) {
        setErrorMessage("Something went wrong, try again!");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Something went wrong, try again!");
    }
    // reload();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textinput}>
          <TextInput
            placeholder="Add a new follower..."
            value={userValue}
            onChangeText={(text) => setUserValue(text)}
            backgroundColor={colors.secondary}
            marginVertical={0}
            size={20}
            padding={10}
          />
        </View>
        <View style={styles.addbutton}>
          <TouchableOpacity onPress={handleAddUser}>
            <Icon name="account" />
          </TouchableOpacity>
        </View>
      </View>
      <ErrorMessage error={errorMessage} visible={errorMessage} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addbutton: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    backgroundColor: colors.title,
    borderRadius: 10,
  },
  textinput: {
    width: "80%",
  },
});

export default FollowUser;
