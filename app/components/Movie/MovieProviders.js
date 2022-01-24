import React from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../../config/colors";
import tmdb from "../../config/tmdb";
import PosterListWithSubs from "./../Lists/PosterListWithSubs";
import { SmallText } from "../Text";

function MovieProviders({ providers, ...styleProps }) {
  return (
    <View style={{ ...styleProps }}>
      <PosterListWithSubs
        data={providers}
        uriPath="logo_path"
        titleName="provider_name"
        tmdbUrl={tmdb.provider_url}
        width={100}
        height={100}
      />
      <View style={styles.justWatch}>
        <SmallText style={{ color: colors.grey }}>
          provider data provided by
        </SmallText>
        <SmallText style={{ color: "#E0B51A" }}> JustWatch</SmallText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  justWatch: {
    marginTop: 10,
    flexDirection: "row",
  },
});

export default MovieProviders;
