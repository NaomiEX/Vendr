import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import BodyText from "../components/Text/BodyText";

const ExpandingText = (props) => {
  const [numberOfLines, setNumberOfLines] = useState(props.numOfLines);

  return (
    <View>
      <BodyText style={props.textStyle} numberOfLines={numberOfLines}>
        {props.text}
      </BodyText>
      {props.text.length > props.boundaryLength && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            numberOfLines
              ? setNumberOfLines()
              : setNumberOfLines(props.numOfLines);
          }}
        >
          <Text
            style={{
              ...props.expanderStyle,
              fontSize: 12,
            }}
          >
            View {numberOfLines ? "More" : "Less"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExpandingText;
