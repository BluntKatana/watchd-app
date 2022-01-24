import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "./Icon";
import TextInput from "./TextInput";

function SearchBar({ onChange, ...otherProps }) {
  return (
    <TextInput
      icon="search"
      iconPack="FA"
      onChangeText={(text) => onChange(text)}
      {...otherProps}
    />
  );
}

export default SearchBar;
