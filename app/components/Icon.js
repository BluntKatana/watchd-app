import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

function Icon({
  name,
  size = 40,
  backgroundColor,
  iconColor = "#fff",
  iconPack = "MCI",
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {iconPack == "FA" ? (
        <FontAwesome name={name} color={iconColor} size={size * 0.7} />
      ) : (
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.7}
        />
      )}
    </View>
  );
}

export default Icon;
