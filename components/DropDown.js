import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import EmphasisText from "./Text/EmphasisText";

import Colors from "../constants/Colors";

const DropDown = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(props.data[0].label);

  const { initialValue } = props;
  useEffect(() => {
    setSelectedItem(initialValue);
  }, [initialValue]);

  useEffect(() => {
    props.setSelectedItem(props.inputIdentifier, selectedItem);
  }, [selectedItem]);

  const renderDropDownListItem = (itemData) => {
    console.log(itemData.item);
    return (
      <View style={{ marginVertical: 5 }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setSelectedItem(itemData.item.label);
            setIsExpanded(false);
          }}
        >
          <Text style={styles.dropDownText}>{itemData.item.label}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={props.style}>
      <View
        style={{ ...styles.dropDownContainer, width: props.listStyle.width }}
      >
        <Text style={styles.dropDownText}>{selectedItem}</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setIsExpanded((state) => !state);
          }}
        >
          <Image
            style={{ width: 10, height: 10 }}
            source={
              isExpanded
                ? require("../assets/icons/drop_down_collapse.png")
                : require("../assets/icons/drop_down_arrow.png")
            }
          />
        </TouchableOpacity>
      </View>
      {isExpanded && (
        <View
          style={{
            ...styles.dropDownListContainer,
            width: props.listStyle.width,
          }}
        >
          <FlatList data={props.data} renderItem={renderDropDownListItem} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    borderColor: Colors.translucent_grey,
    height: 40,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  dropDownListContainer: {
    borderColor: Colors.translucent_grey,
    borderTopColor: "white",
    borderWidth: 1.5,
    height: 200,
    paddingLeft: 10,
  },

  dropDownText: {
    fontFamily: "helvetica-light",
    color: Colors.black,
    fontSize: 14,
  },
});

export default DropDown;
