import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Platform, Text } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

import Colors from "../../constants/Colors";

const CustomDrawerItem = (props) => {
  const activeScreen = useSelector(
    (state) => state.activeComponents.currentScreen
  );

  const topScreen = useSelector((state) => state.activeComponents.topScreen);

  const isCurrentScreenActive = activeScreen === props.title ? true : false;

  let IconPack = props.iconPack;
  const isIonicons = IconPack === Ionicons;

  const navigateToTop = () => {
    props.navigation.dispatch(StackActions.popToTop());
    props.navigation.closeDrawer();
  };

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
                color: isCurrentScreenActive ? Colors.primary : Colors.black,
                fontFamily: "helvetica-light",
              }}
            >
              {props.title}
            </Text>
          </View>
        )}
        onPress={() => {
          activeScreen === props.screen && !topScreen
            ? navigateToTop()
            : props.navigation.navigate(props.screen);
        }}
        focused={isCurrentScreenActive}
        activeBackgroundColor={"rgba(255,81,81,0.1)"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContentContainer: { marginTop: 2 },

  drawerTitle: {
    fontSize: 17,
  },
});

export default CustomDrawerItem;
