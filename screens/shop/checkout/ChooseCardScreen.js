import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Screen from "../../../components/UI/BasicScreen";
import TitleText from "../../../components/Text/TitleText";
import Divider from "../../../components/UI/Divider";
import CreditCardInfo from "../../../components/UI/CreditCardInfo";
import CustomHeaderButton from "../../../components/UI/HeaderButton";

import Colors from "../../../constants/Colors";
import DeviceDimensions from "../../../constants/DeviceDimensions";

import * as cardActions from "../../../store/actions/card";

const ManageCardsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { navigation } = props;
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", async () => {
      await dispatch(cardActions.getCards());
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const cards = useSelector((state) => state.card.cards);
  console.log("THE CARDS:");
  console.log(cards);

  useEffect(() => {
    props.route.params &&
      ToastAndroid.showWithGravityAndOffset(
        props.route.params.toastText,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        160
      );
  });

  useEffect(() => {
    const reRender = async () => {
      await dispatch(cardActions.getCards());
      setIsLoading(false);
    };

    isLoading === true && reRender();
  }, [isLoading]);

  const renderCardItem = (itemData) => {
    return (
      <View style={styles.cardItem}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <CreditCardInfo
            info={itemData.item}
            editCardInfo={() => {
              props.navigation.navigate("Edit Card", {
                cardInfo: itemData.item,
              });
            }}
            deleteCard={async (id) => {
              setIsLoading(true);
              await dispatch(cardActions.deleteCard(id));
            }}
          />
        )}
      </View>
    );
  };

  if (cards.length <= 0) {
    return (
      <Screen>
        <Text>No cards available. Please add a card through Settings</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={{ alignItems: "center" }}>
        <TitleText style={{ color: Colors.primary }}>Credit Cards</TitleText>
        <Divider dividerStyle={{ width: 30, height: 2, marginTop: 5 }} />
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 80 }}
        style={{ marginTop: 10 }}
        data={cards}
        renderItem={renderCardItem}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    marginTop: 30,
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("Edit Card");
          }}
          color={Colors.inactive_grey}
          size={25}
        />
      </HeaderButtons>
    ),
  };
};

export default ManageCardsScreen;
