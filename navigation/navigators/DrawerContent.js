import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Platform, Text } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const CustomDrawerItem = (props) => {
  const activeScreen = useSelector(
    (state) => state.activeComponents.currentScreen
  );

  const isCurrentScreenActive = activeScreen === props.title ? true : false;

  let IconPack = props.iconPack;
  const isIonicons = IconPack === Ionicons;

  return (
    <View style={styles.drawerContentContainer} {...props}>
      <DrawerItem
        icon={() => (
          <IconPack
            name={
              isIonicons
                ? Platform.OS === "android"
                  ? `md-${props.icon}`
                  : `ios-${props.icon}`
                : `${props.icon}`
            }
            size={isIonicons ? 27 : 19}
            color={
              isCurrentScreenActive ? Colors.primary : Colors.inactive_grey
            }
          />
        )}
        label={() => (
          <View>
            <Text
              style={{
                ...styles.drawerTitle,
                color: isCurrentScreenActive ? Colors.primary : "black",
                fontFamily: isCurrentScreenActive
                  ? "helvetica-bold"
                  : "helvetica-standard",
              }}
            >
              {props.title}
            </Text>
          </View>
        )}
        onPress={() => {
          props.navigation.navigate(props.screen);
        }}
        focused={isCurrentScreenActive}
        activeBackgroundColor={"rgba(212,40,40,0.2)"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContentContainer: { marginTop: 2 },

  drawerTitle: {
    fontSize: 16,
  },
});

export default CustomDrawerItem;
