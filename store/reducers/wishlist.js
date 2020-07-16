import {
  ADD_TO_WISHLIST,
  STORE_WISHLIST,
  DELETE_FROM_WISHLIST,
  STORE_ALL_WISHLIST,
} from "../actions/wishlist";

const initialState = {
  products: [],
  allWishlists: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      // console.log("Product Id passed from action:");
      // console.log(action.productId);
      // console.log("Products in wishlist:");
      // console.log(state.products);
      // console.log("Product name:");
      // console.log(action.productName);
      return {
        ...state,
        products: [
          ...state.products,
          { productId: action.productId, wishlistName: action.productName },
        ],
      };

    case STORE_WISHLIST:
      // console.log("Wishlist passed from action:");
      // console.log(action.wishlist);
      return {
        ...state,
        products: action.wishlist,
      };

    case DELETE_FROM_WISHLIST:
      const filteredWishlist = state.products.filter(
        (product) => product.wishlistName !== action.wishlistName
      );
      // console.log("FILTERED WISHLIST:");
      // console.log(filteredWishlist);
      return {
        ...state,
        products: filteredWishlist,
      };

    case STORE_ALL_WISHLIST:
      return { ...state, allWishlists: action.wishlist };

    default:
      return state;
  }
};
