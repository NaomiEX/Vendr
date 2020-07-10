import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

import Screen from "../../components/UI/BasicScreen";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import EmphasisText from "../../components/Text/EmphasisText";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as notificationsActions from "../../store/actions/notifications";
import * as otherUserProfilesActions from "../../store/actions/otherUserProfiles";
import { ActivityIndicator } from "react-native-paper";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const NotificationsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { navigation } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", async () => {
      await dispatch(notificationsActions.getNotifications());
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const allNotifications = useSelector(
    (state) => state.notifications.notifications
  );

  // console.log("NOTIFICATIONS: ");
  // console.log(allNotifications);

  let ids = [];
  let formattedNotifications = [];
  let dates = [];

  useEffect(() => {
    for (const index in allNotifications) {
      ids.push(allNotifications[index].sender);
    }
    // console.log(ids);
    dispatch(otherUserProfilesActions.getOtherProfiles(ids));
  }, [allNotifications]);
  const otherProfiles = useSelector(
    (state) => state.otherUserProfiles.otherUsers
  );

  // console.log(otherProfiles);

  for (const index in allNotifications) {
    let date = allNotifications[index].date;
    let fromNow = moment(date, "DD MMMM YYYY-hh:mm a").fromNow();
    // console.log(fromNow);
    if (
      fromNow.endsWith("hours ago") ||
      fromNow.endsWith("minutes ago") ||
      fromNow.endsWith("hour ago") ||
      fromNow.endsWith("minute ago") ||
      fromNow.endsWith("seconds ago")
    ) {
      dates.push("TODAY");
    } else if (fromNow.endsWith("day ago")) {
      dates.push("YESTERDAY");
    } else {
      dates.push(date.split("-")[0].toUpperCase());
    }
    let senderProfile = otherProfiles.filter(
      (user) => user.uid === allNotifications[index].sender
    )[0];

    // console.log(senderProfile);

    senderProfile &&
      formattedNotifications.push({
        id: allNotifications[index].id,
        time: date.split("-")[1],
        message: allNotifications[index].message,
        sender: allNotifications[index].sender,
        type: allNotifications[index].type,
        profilePicture: senderProfile.profilePicture,
        username: senderProfile.username,
      });
  }

  // console.log("FORMATTED NOTIFICATIONS: ");
  // console.log(formattedNotifications);

  // useEffect(() => {

  // }, [deleteItem])
  let index = -1;
  const renderNotificationItem = (notificationData) => {
    let show = true;
    let sameType = false;
    index++;
    // console.log("INDEX: ");
    // console.log(index);
    // console.log("dates[index]");
    // console.log(dates[index]);
    // console.log("dates[index-1]");
    // console.log(dates[index - 1]);

    if (index !== 0) {
      if (dates[index] === dates[index - 1]) {
        show = false;
      }
    }

    if (index !== 0 && show === false) {
      if (
        formattedNotifications[index].type ===
        formattedNotifications[index - 1].type
      ) {
        sameType = true;
      }
    }

    const official = ["official", "transaction", "wishlist"];

    return (
      <View key={notificationData.id}>
        {show && <Text style={styles.categoryHeader}>{dates[index]}</Text>}
        <View style={{ paddingHorizontal: 20 }}>
          {/* {sameType && (
            <Divider
              dividerStyle={{
                dividerColor: "white",
                marginTop: 2,
                width: DeviceDimensions.width - 40,
                height: 1,
              }}
            />
          )} */}
        </View>
        <TouchableComponent
          onLongPress={() => {
            Alert.alert(
              "Delete notification?",
              "Would you like to delete this notification?",
              [
                {
                  text: "Yes",
                  onPress: async () => {
                    setIsLoading(true);
                    await dispatch(
                      notificationsActions.deleteNotification(
                        notificationData.id
                      )
                    );
                    await dispatch(notificationsActions.getNotifications());
                    setIsLoading(false);
                  },
                },
                {
                  text: "No",
                },
              ]
            );
          }}
        >
          <View
            style={{
              backgroundColor: !official.includes(notificationData.type)
                ? Colors.translucent_grey
                : Colors.primary,
              width: "100%",
              height: 100,
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.profilePicture}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: notificationData.profilePicture }}
                />
              </View>
              <View style={{ paddingLeft: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: !official.includes(notificationData.type)
                        ? "#585858"
                        : "white",
                      fontFamily: "helvetica-bold",
                      fontSize: 14,
                    }}
                  >
                    {notificationData.username}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "helvetica-standard",
                      fontSize: 12,
                      color: !official.includes(notificationData.type)
                        ? Colors.grey
                        : Colors.translucent_white,
                    }}
                  >
                    {notificationData.time}
                  </Text>
                </View>
                <Text
                  numberOfLines={2}
                  style={{
                    width: 272.73,
                    marginTop: 6,
                    fontSize: 12,
                    color: !official.includes(notificationData.type)
                      ? "#585858"
                      : "white",
                    fontFamily: "helvetica-light",
                  }}
                >
                  {notificationData.type.includes("product discussion")
                    ? `This user has left a comment on one of your products: ${notificationData.message}`
                    : notificationData.message}
                </Text>
              </View>
            </View>
          </View>
        </TouchableComponent>
        <Divider
          dividerStyle={{
            width: DeviceDimensions.width - 40,
            marginTop: -1,
            marginHorizontal: 20,
            height: 1,
            dividerColor: Colors.translucent_white,
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View>
        <View style={{ alignItems: "center" }}>
          <TitleText style={{ color: Colors.primary }}>Notifications</TitleText>
          <Divider dividerStyle={{ marginTop: 5, width: 30, height: 2 }} />
          {allNotifications.length <= 0 && (
            <EmphasisText
              style={{
                color: Colors.inactive_grey,
                marginHorizontal: 20,
                marginTop: 250,
              }}
            >
              There are currently no notifications for you
            </EmphasisText>
          )}
          {isLoading && (
            <ActivityIndicator
              style={{ marginTop: 20 }}
              color={Colors.primary}
              size="small"
            />
          )}
        </View>
        {formattedNotifications.map((notification) =>
          renderNotificationItem(notification)
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryHeader: {
    fontSize: 14,
    fontFamily: "helvetica-standard",
    letterSpacing: 0.5,
    marginLeft: 20,
    color: Colors.inactive_grey,
    marginBottom: 5,
    marginTop: 30,
  },

  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderColor: "white",
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationsScreen;
