import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
export const BottomMenuItem = ({ iconName, isCurrent }) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        name={iconName}
        size={32}
        style={{ color: isCurrent ? 'blue' : 'grey' }}
      />
    </View>
  );
};
