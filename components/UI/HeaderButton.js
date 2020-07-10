import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={props.size ? props.size : 30}
      // color="rgba(255,255,255,0.9)"
      color={props.color ? props.color : Colors.inactive_grey}
    />
  );
};

export default CustomHeaderButton;
