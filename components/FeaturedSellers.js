import React, { useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import BubbleIcon from "../components/UI/BubbleIcon";
import BodyText from "../components/Text/BodyText";

import * as otherUserProfilesActions from "../store/actions/otherUserProfiles";

const FeaturedSellers = (props) => {
  const featuredProfiles = useSelector(
    (state) => state.otherUserProfiles.otherUsers
  );

  const renderFeaturedSellerItem = (itemData) => {
    return (
      <View style={{ ...props.style, alignItems: "center", marginRight: 20 }}>
        <BubbleIcon
          iconBackgroundColor="white"
          profilePicture={{ uri: itemData.item.profilePicture }}
          onClickEdit={props.onOtherUserProfileTapped.bind(
            this,
            itemData.item.uid
          )}
        />
        <View style={{ width: 65, marginTop: 5 }}>
          <BodyText style={{ textAlign: "center" }} numberOfLines={1}>
            {itemData.item.username}
          </BodyText>
        </View>
      </View>
    );
  };

  console.log("FEATURED PROFILES:");
  console.log(featuredProfiles);

  return (
    <View>
      <FlatList
        horizontal={true}
        data={featuredProfiles.slice(0, 10)}
        keyExtractor={(item) => item.uid}
        renderItem={renderFeaturedSellerItem}
      />
    </View>
  );
};

export default FeaturedSellers;
