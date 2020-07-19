import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Modal,
  TextInput,
  Image,
  ToastAndroid,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import BubbleIcon from "../components/UI/BubbleIcon";
import BodyText from "../components/Text/BodyText";
import Divider from "../components/UI/Divider";
import EmphasisText from "../components/Text/EmphasisText";

import Colors from "../constants/Colors";

import * as productDiscussionActions from "../store/actions/productDiscussion";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const ProductDiscussion = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [reply, setReply] = useState("");

  const productDiscussion = useSelector(
    (state) => state.productDiscussion.productDiscussion
  );

  // console.log("PRODUCT DISCUSSION FROM THE SCREEN:");
  // console.log(productDiscussion);

  const replies = productDiscussion.filter(
    (discussion) => discussion.type === "reply"
  );
  const posts = productDiscussion.filter(
    (discussion) => discussion.type === "post"
  );

  for (const key in replies) {
    let supplanted = false;
    let index = 0;
    while (!supplanted) {
      if (posts[index].key === replies[key].repliedMessageInfo.key) {
        posts.splice(index + 1, 0, replies[key]);
        supplanted = true;
      } else {
        index++;
      }
    }
    // console.log("REPLIED MESSAGE INFO");
    // console.log(replies[key]);
  }
  // console.log("SECOND POSTS:");
  // console.log(posts);

  const onClickReplyHandler = () => {
    Keyboard.dismiss();
    const relevantData = {
      key: modalData.key,
      senderUsername: modalData.senderUsername,
    };

    props.onSubmitReplyHandler(relevantData, reply);
    setShowModal(false);
    setReply("");
    ToastAndroid.showWithGravityAndOffset(
      "Reply Successfully Posted!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      160
    );
  };

  const renderDiscussionItem = (discussion) => {
    return (
      <TouchableComponent
        onPress={() => {
          setShowModal(true);
          setModalData(discussion);
        }}
        key={discussion.key}
      >
        <View style={{ marginHorizontal: -30 }}>
          <View style={styles.postRow}>
            {discussion.type === "reply" && (
              <Image
                style={{ marginRight: 20 }}
                source={require("../assets/icons/enter_arrow.png")}
              />
            )}
            <BubbleIcon
              iconBackgroundColor="white"
              profilePicture={
                discussion.senderProfilePicture
                  ? { uri: discussion.senderProfilePicture }
                  : require("../assets/Anonymous.png")
              }
              onClickEdit={props.onClickProfilePicture.bind(
                this,
                discussion.senderId
              )}
            />
            <View
              style={{
                flex: 1,
                marginLeft: 20,
              }}
            >
              <Text style={styles.username}>{discussion.senderUsername}</Text>
              <BodyText
                style={{
                  textAlign: "justify",
                  lineHeight: 20,
                  color: Colors.grey,
                }}
                numberOfLines={5}
              >
                {discussion.type === "reply" && (
                  <Text style={{ fontStyle: "italic" }}>
                    Reply to
                    {" " + discussion.repliedMessageInfo.senderUsername + ": "}
                  </Text>
                )}
                {discussion.message}
              </BodyText>
            </View>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Divider
              dividerStyle={{
                width: "100%",
                height: 1.5,
                marginTop: 20,
              }}
            />
          </View>
        </View>
      </TouchableComponent>
    );
  };

  const inputChangeHandler = (text) => {
    setReply(text);
  };

  return (
    <View>
      {posts.length <= 0 && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <EmphasisText
            style={{
              textAlign: "center",
              color: Colors.inactive_grey,
              marginTop: 40,
              marginBottom: 20,
              width: "80%",
            }}
          >
            There is currently no discussion for this product
          </EmphasisText>
        </View>
      )}
      {posts.map((discussionItem) => renderDiscussionItem(discussionItem))}
      <Modal transparent animationType="fade" visible={showModal}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(false);
          }}
        >
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <BubbleIcon
                    iconBackgroundColor="white"
                    profilePicture={
                      modalData.senderProfilePicture
                        ? { uri: modalData.senderProfilePicture }
                        : require("../assets/Anonymous.png")
                    }
                    onClickEdit={() => {
                      setShowModal(false);
                      props.onClickProfilePicture(modalData.senderId);
                    }}
                  />
                  <View style={{ marginLeft: 20, width: 190 }}>
                    <Text style={{ ...styles.username, fontSize: 14 }}>
                      {modalData.senderUsername}
                    </Text>
                    <ScrollView
                      persistentScrollbar
                      style={{ height: 200, marginBottom: 20 }}
                    >
                      <Text
                        style={{
                          fontFamily: "helvetica-standard",
                          fontSize: 14,
                          lineHeight: 23,
                          color: Colors.black,
                        }}
                      >
                        {modalData.message}
                      </Text>
                    </ScrollView>
                  </View>
                </View>
                <View style={styles.replyContainer}>
                  <TextInput
                    multiline
                    value={reply}
                    onChangeText={inputChangeHandler}
                    style={styles.replyTextBox}
                    placeholder="Reply to this post..."
                    placeholderTextColor={Colors.grey}
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={onClickReplyHandler}
                  >
                    <Image source={require("../assets/icons/next_arrow.png")} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    fontFamily: "helvetica-bold",
    fontSize: 14,
    color: Colors.black,
  },

  postRow: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: "center",
  },

  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  modal: {
    backgroundColor: "white",
    width: "80%",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  replyContainer: {
    backgroundColor: Colors.translucent_grey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
  },

  replyTextBox: { width: "80%", paddingHorizontal: 10, paddingVertical: 5 },
});

export default ProductDiscussion;
