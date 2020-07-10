import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ToastAndroid } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Screen from "../../components/UI/BasicScreen";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import CreditCardInfo from "../../components/UI/CreditCardInfo";
import CustomHeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as cardActions from "../../store/actions/card";
import { ActivityIndicator } from "react-native-paper";

const ManageCardsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const dispatch = useDispatch();

  const { navigation, noCards } = props;
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", async () => {
      await dispatch(cardActions.getCards());
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const cards = useSelector((state) => state.card.cards);
  // console.log("THE CARDS:");
  // console.log(cards);

  const selectedCard = useSelector((state) => state.card.selectedCard);
  console.log("SELECTED CARD");
  console.log(selectedCard);

  useEffect(() => {
    dispatch(cardActions.setSelectedCard(selectedId));
  }, [selectedId]);

  useEffect(() => {
    setSelectedId(selectedCard);
  }, []);

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
            fromCheckout={props.route.params && props.route.params.fromCheckout}
            editCardInfo={() => {
              props.navigation.navigate("Edit Card", {
                cardInfo: itemData.item,
              });
            }}
            onSelectCard={(id) => {
              setSelectedId(id);
            }}
            selectedId={selectedId}
            deleteCard={async (id) => {
              setIsLoading(true);
              await dispatch(cardActions.deleteCard(id));
            }}
          />
        )}
      </View>
    );
  };

  console.log("SELECTED ID: " + selectedId);

  return (
    <Screen>
      <View style={{ alignItems: "center" }}>
        <TitleText style={{ color: Colors.primary }}>Credit Cards</TitleText>
        <Divider dividerStyle={{ width: 30, height: 2, marginTop: 5 }} />
      </View>
      {cards.length <= 0 ? (
        <View style={{ flex: 1, marginTop: 240, marginHorizontal: 20 }}>
          <Text
            style={{
              textAlign: "center",
              color: Colors.inactive_grey,
              fontSize: 18,
            }}
          >
            No cards available. Please add one from the Settings screen
          </Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 80 }}
          style={{ marginTop: 10 }}
          data={cards}
          renderItem={renderCardItem}
        />
      )}
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
