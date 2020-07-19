import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Image,
  ScrollView,
  Button,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as firebase from "firebase";

import { v4 as uuidv4 } from "uuid";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import TitleText from "../../components/Text/TitleText";
import Input from "../../components/Input";
import HeaderText from "../../components/Text/HeaderText";
import BodyText from "../../components/Text/BodyText";
import productImage from "../../models/productImage";
import ProductImagePicker from "../../components/ProductImagePicker";
import CategoriesList from "../../components/CategoriesList";
import CustomHeaderButton from "../../components/UI/HeaderButton";

import { CATEGORIES } from "../../data/categories";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";
import EmphasisText from "../../components/Text/EmphasisText";
import category from "../../models/categories";

import * as productActions from "../../store/actions/products";
import * as notificationsActions from "../../store/actions/notifications";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const FORM_GENERAL_UPDATE = "FORM_GENERAL_UPDATE";
const FORM_UPDATE_GENERAL_VALIDITIES = "FORM_UPDATE_GENERAL_VALIDITIES";

const formReducer = (state, action) => {
  let updatedFormIsValid = true;
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.inputType]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.inputType]: action.isValid,
      };
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        ...state,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
        formIsValid: updatedFormIsValid,
      };

    case FORM_GENERAL_UPDATE:
      // console.log("action.itemType::::::");
      // console.log(action.itemType);
      // console.log("action.item::::::::");
      // console.log(action.item);
      const updatedGeneralValues = {
        ...state.inputValues,
        [action.itemType]: action.item,
      };
      return {
        ...state,
        inputValues: updatedGeneralValues,
      };

    case FORM_UPDATE_GENERAL_VALIDITIES:
      const updatedGeneralValidities = {
        ...state.inputValidities,
        thumbnail: action.thumbnail,
        productImages: action.productImages,
        categories: action.categories,
      };
      for (const key in updatedGeneralValidities) {
        updatedFormIsValid =
          updatedFormIsValid && updatedGeneralValidities[key];
      }
      return {
        ...state,
        inputValidities: updatedGeneralValidities,
        formIsValid: updatedFormIsValid,
      };
  }
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [show, setShow] = useState(false);

  const params = props.route.params ? props.route.params : null;

  // console.log(params && "THIS IS AN EDITTED PRODUCT, THE PARAMS ARE:");
  // console.log(params && params.id);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: params ? params.title : "",
      price: params ? params.price : 0,
      description: params ? params.description : "",
      thumbnail: params
        ? params.thumbnail
        : new productImage(
            "add_thumbnail",
            require("../../assets/add_thumbnail.png")
          ),
      productImages: params
        ? [
            new productImage(
              "add_picture",
              require("../../assets/add_picture.png")
            ),
            ...params.productImages,
          ]
        : [
            new productImage(
              "add_picture",
              require("../../assets/add_picture.png")
            ),
          ],
      categories: params ? params.categories : [],
    },
    inputValidities: {
      title: false,
      price: false,
      thumbnail: false,
      productImages: false,
      description: false,
      categories: false,
    },
    formIsValid: false,
  });

  // console.log(formState);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        {
          text: "Okay",
          onPress: () => {
            setError(null);
            setButtonPressed(false);
            setIsLoading(false);
          },
        },
      ]);
      setShow(true);
    }
  }, [error]);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Save"
              iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
              onPress={() => {
                setIsLoading(true);
                setButtonPressed(true);
              }}
            />
          </HeaderButtons>
        );
      },
    });
  }, [buttonPressed, isLoading]);

  const {
    title,
    thumbnail,
    price,
    productImages,
    description,
    categories,
  } = formState.inputValues;

  useEffect(() => {
    dispatchFormState({
      type: FORM_UPDATE_GENERAL_VALIDITIES,
      thumbnail: thumbnail.id === "add_thumbnail" ? false : true,
      productImages: productImages.length === 1 ? false : true,
      categories: categories.length === 0 ? false : true,
    });
  }, [thumbnail, productImages, categories]);

  const { formIsValid } = formState;

  useEffect(() => {
    // console.log("HOy");
    const createProductHandler = async () => {
      Keyboard.dismiss();
      if (!formIsValid) {
        for (let index in formState.inputValidities) {
          if (!formState.inputValidities[index]) {
            if (index === "productImages") {
              index = "picture";
            } else if (index === "categories") {
              index = "category";
            }
            setError(`Please select a ${index} for your product`);
            break;
          }
        }
      } else {
        try {
          let productImageUrl;
          const productIdentifier = uuidv4();
          let uploadedThumbnail = thumbnail;
          const uploadImage = async (uri, type) => {
            const filename = `${uuidv4()}.jpg`;
            let ref = firebase
              .storage()
              .ref()
              .child(`images/${type}/${productIdentifier}/` + filename);
            const response = await fetch(uri);
            const blob = await response.blob();
            await ref.put(blob);
            await ref
              .getDownloadURL()
              .then((url) =>
                type === "thumbnail"
                  ? (uploadedThumbnail.imageUrl = url)
                  : (productImageUrl = url)
              );
          };

          let uploadedProductImages = productImages;
          const getProducts = async () => {
            for (const key in productImages) {
              if (key > 0) {
                if (!productImages[key].imageUrl.startsWith("http")) {
                  await uploadImage(
                    productImages[key].imageUrl,
                    "product_images"
                  );
                  uploadedProductImages[key].imageUrl = productImageUrl;
                }
              }
            }
          };
          const saveToDatabase = async () => {
            if (!thumbnail.imageUrl.startsWith("http")) {
              await uploadImage(thumbnail.imageUrl, "thumbnail");
            }
            await getProducts();

            if (params) {
              // console.log("DISPATCH UPDATE PRODUCT");
              await dispatch(
                productActions.updateProduct(
                  params.id,
                  title,
                  uploadedThumbnail,
                  price,
                  uploadedProductImages.filter(
                    (image) => image.id !== "add_picture"
                  ),
                  description,
                  categories
                )
              );

              await dispatch(
                notificationsActions.wishlistChanges(params.id, params.title)
              );
              props.navigation.navigate("Home", {
                toastText: "Product successfully edited!",
              });
            } else {
              await dispatch(
                productActions.createProduct(
                  title,
                  uploadedThumbnail,
                  price,
                  uploadedProductImages.filter(
                    (image) => image.id !== "add_picture"
                  ),
                  description,
                  categories
                )
              );
              props.navigation.navigate("Account", {
                toastText: "Product successfully created!",
              });
            }
          };

          saveToDatabase();
        } catch (err) {
          if (buttonPressed) {
            setError(err.message);
          }
          // runs twice but since the second time setIsLoading(true) does not run, it makes no visual difference as isLoading is already false

          setShow(true);
          setButtonPressed(false);
          setIsLoading(false);
        }
      }
    };
    if (buttonPressed) {
      createProductHandler();
    }
  }, [buttonPressed, formIsValid]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputType: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const onPickedImage = (pickedImage) => {
    const updated = [
      ...formState.inputValues.productImages,
      new productImage(uuidv4(), pickedImage),
    ];
    dispatchFormState({
      type: FORM_GENERAL_UPDATE,
      itemType: "productImages",
      item: updated,
    });
  };

  const onPickedThumbnail = (pickedThumbnail) => {
    dispatchFormState({
      type: FORM_GENERAL_UPDATE,
      itemType: "thumbnail",
      item: new productImage(uuidv4(), pickedThumbnail),
    });
  };

  const deleteImageHandler = (imageUri) => {
    const update = formState.inputValues.productImages.filter(
      (product) => product.imageUrl !== imageUri
    );
    dispatchFormState({
      type: FORM_GENERAL_UPDATE,
      itemType: "productImages",
      item: update,
    });
  };

  const deleteThumbnailHandler = () => {
    dispatchFormState({
      type: FORM_GENERAL_UPDATE,
      itemType: "thumbnail",
      item: new productImage(
        "add_thumbnail",
        require("../../assets/add_thumbnail.png")
      ),
    });
  };

  const renderFlatlistItem = (itemData) => {
    return (
      <View style={{ width: 120, height: 120, marginRight: 20 }}>
        <ProductImagePicker
          onImagePicked={onPickedImage}
          image={
            itemData.item.id === "add_picture" ? itemData.item.imageUrl : null
          }
          imageUri={
            itemData.item.id !== "add_picture" ? itemData.item.imageUrl : null
          }
          deleteImageHandler={deleteImageHandler}
        />
      </View>
    );
  };

  const chooseCategory = (title) => {
    formState.inputValues.categories.includes(title)
      ? dispatchFormState({
          type: FORM_GENERAL_UPDATE,
          itemType: "categories",
          item: formState.inputValues.categories.filter(
            (category) => category !== title
          ),
        })
      : dispatchFormState({
          type: FORM_GENERAL_UPDATE,
          itemType: "categories",
          item: [...formState.inputValues.categories, title],
        });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{ flex: 1, marginBottom: 80 }}
        >
          <TitleText style={styles.titleText}>Create Product</TitleText>
          <View style={{ alignItems: "center" }}>
            <View style={styles.divider}></View>
          </View>
          <View style={styles.body}>
            <HeaderText>Product Title</HeaderText>
            <BodyText style={{ color: Colors.inactive_grey }}>
              Keep it brief to catch user attention!
            </BodyText>
            <Input
              style={{
                borderBottomColor: Colors.translucent_grey,
                color: Colors.black,
                fontSize: 14,
              }}
              type="title"
              onInputChange={inputChangeHandler}
              show={show}
              initialValue={title}
            />
            <HeaderText style={{ marginTop: 20 }}>Price</HeaderText>
            <BodyText style={styles.description}>
              Please choose an appropriate price for your product
            </BodyText>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: Colors.accent,
                  fontFamily: "helvetica-standard",
                  fontSize: 18,
                  marginRight: 10,
                }}
              >
                $
              </Text>
              <Input
                style={{
                  borderBottomColor: Colors.translucent_grey,
                  color: Colors.accent,
                  fontSize: 18,
                  width: 70,
                }}
                type="price"
                keyboardType="numeric"
                onInputChange={inputChangeHandler}
                show={show}
                initialValue={price}
              />
            </View>
            <View style={{ ...styles.thumbnail, ...styles.header }}>
              <View>
                <HeaderText>Thumbnail</HeaderText>
                <BodyText
                  style={{ ...styles.description, width: 208, lineHeight: 18 }}
                >
                  This is the first image the buyer will see so choose
                  carefully!
                </BodyText>
              </View>
              <ProductImagePicker
                thumbnail={
                  formState.inputValues.thumbnail.id === "add_thumbnail"
                    ? formState.inputValues.thumbnail.imageUrl
                    : null
                }
                thumbnailUri={
                  formState.inputValues.thumbnail.id !== "add_thumbnail"
                    ? formState.inputValues.thumbnail.imageUrl
                    : null
                }
                onThumbnailPicked={onPickedThumbnail}
                deleteThumbnailHandler={deleteThumbnailHandler}
              />
            </View>
            <HeaderText style={styles.header}>Product Images</HeaderText>
            <BodyText style={styles.description}>
              Choose the images which represent your product the most
            </BodyText>
            <FlatList
              data={formState.inputValues.productImages}
              renderItem={renderFlatlistItem}
              horizontal={true}
            />
            <HeaderText style={styles.header}>Description</HeaderText>
            <BodyText style={styles.description}>
              Describe your product as accurate and detailed as possible, but
              don't forget to make it enticing!
            </BodyText>
            <Input
              style={{
                borderColor: Colors.translucent_grey,
                color: Colors.black,
                fontSize: 12,
              }}
              type="description"
              onInputChange={inputChangeHandler}
              show={show}
              multiline
              numberofLines={10}
              initialValue={description}
            />
            <HeaderText style={styles.header}>Categories</HeaderText>
            <BodyText style={styles.description}>
              Choose as many categories as possible that fits your product
            </BodyText>
            <CategoriesList
              initialValue={categories}
              onChooseCategoryHandler={chooseCategory}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  titleText: {
    textAlign: "center",
    marginBottom: 10,
    color: Colors.primary,
  },

  divider: {
    width: DeviceDimensions.width / 6,
    height: 2,
    backgroundColor: Colors.translucent_grey,
    marginBottom: 50,
  },

  description: { color: Colors.inactive_grey, marginBottom: 10 },

  body: {
    marginHorizontal: 20,
  },

  header: { marginTop: 30 },

  thumbnail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EditProductScreen;
