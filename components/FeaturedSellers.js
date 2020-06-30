import React, { useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import BubbleIcon from "../components/UI/BubbleIcon";
import BodyText from "../components/Text/BodyText";

import * as otherUserProfilesActions from "../store/actions/otherUserProfiles";

const FeaturedSellers = (props) => {
  let ownerIds = [];

  for (const key in props.data) {
    ownerIds.push(props.data[key].ownerId);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(otherUserProfilesActions.getOtherProfiles(ownerIds));
  }, [dispatch]);

  const otherProfiles = useSelector(
    (state) => state.otherUserProfiles.otherUsers
  );

  let featuredProfiles = [];

  for (const index in otherProfiles) {
    featuredProfiles.push({
      id: otherProfiles[index].uid,
      username: otherProfiles[index].username,
      profilePicture: otherProfiles[index].profilePicture,
    });
  }

  console.log("FEATURED PROFILES:");
  console.log(featuredProfiles);
  console.log(otherProfiles);

  const renderFeaturedSellerItem = (itemData) => {
    return (
      <View style={{ ...props.style, alignItems: "center", marginRight: 20 }}>
        <BubbleIcon
          iconBackgroundColor="white"
          profilePicture={{ uri: itemData.item.profilePicture }}
          onClickEdit={() => {}}
        />
        <View style={{ width: 65, marginTop: 5 }}>
          <BodyText style={{ textAlign: "center" }} numberOfLines={1}>
            {itemData.item.username}
          </BodyText>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        horizontal={true}
        data={featuredProfiles.slice(0, 10)}
        renderItem={renderFeaturedSellerItem}
      />
    </View>
  );
};

export default FeaturedSellers;
