import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import ProgressBar from "react-native-progress/Bar";
import * as Progress from "react-native-progress";

// console.log(DeviceDimensions);
const AnalyticsCard = (props) => {
  // console.log("LABEL: " + props.label);
  // console.log("% CHANGE: " + props.percentChange);

  let progress = Math.abs(props.percentChange / 100);

  if (progress > 1) {
    progress = 1;
  }

  return (
    <View style={{ ...styles.card, backgroundColor: props.backgroundColor }}>
      <View style={{ alignItems: "flex-end", marginTop: 10 }}>
        <Image
          source={
            props.percentChange > 0
              ? require("../../assets/icons/arrow_up.png")
              : require("../../assets/icons/arrow_down.png")
          }
        />
      </View>
      <Text style={styles.percentage}>
        {props.percentChange === Infinity
          ? 100
          : Math.abs(props.percentChange).toFixed(0)}
        %
      </Text>
      <Text style={styles.data}>{props.data}</Text>
      <Progress.Bar
        progress={progress}
        width={87.58}
        height={5}
        color="white"
        unfilledColor={Colors.translucent_grey}
        borderColor="rgba(0,0,0,0)"
      />
      {/* <ProgressBar
        progress={props.percentChange / 100 > 1 ? 1 : props.percentChange / 100}
        width={87.58}
        color='white'
      /> */}
      <View style={{ justifyContent: "flex-end", flex: 1, marginBottom: 10 }}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 107.58,
    height: 148.52,
    borderRadius: 5,
    overflow: "hidden",
    paddingHorizontal: 10,
  },

  percentage: {
    color: "white",
    fontSize: 24,
    fontFamily: "helvetica-bold",
    marginTop: -5,
  },

  data: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: "helvetica-bold",
    fontSize: 16,
    marginTop: -10,
    marginBottom: 2,
  },

  label: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: "helvetica-bold",
    fontSize: 14,
  },
});

export default AnalyticsCard;
