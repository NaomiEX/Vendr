import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={30}
      // color="rgba(255,255,255,0.9)"
      color={props.translucentBackground ? "white" : "rgba(0,0,0,0.3)"}
    />
  );
};

export default CustomHeaderButton;
