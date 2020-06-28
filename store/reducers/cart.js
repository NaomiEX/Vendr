import {
  ADD_TO_CART,
  REDUCE_FROM_CART,
  REMOVE_FROM_CART,
} from "../actions/cart";
import CartItem from "../../models/cartItem";
// import { ADD_ORDER } from "../actions/orders";
// import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // console.log("PRODUCT ID PASSED FROM ACTION:");
      // console.log(action.productId);
      // console.log("CURRENT STATE OF CART");
      // console.log(state);
      // console.log("OWNER USERNAME PASSED FROM ACTION:");
      // console.log(action.ownerUsername);
      let cartItem;

      if (state.items[action.productId]) {
        cartItem = new CartItem(
          state.items[action.productId].quantity + 1,
          state.items[action.productId].sum + action.productPrice,
          action.ownerUsername
        );
      } else {
        cartItem = new CartItem(1, action.productPrice, action.ownerUsername);
      }
      return {
        ...state,
        items: { ...state.items, [action.productId]: cartItem },
        totalAmount: state.totalAmount + action.productPrice,
      };

    case REDUCE_FROM_CART:
      // console.log("CURRENT STATE OF CART (FROM REDUCE_FROM_CART)");
      // console.log(state);
      const selectedCartItem = state.items[action.productId];

      const currentQuantity = selectedCartItem.quantity;

      let updatedCartItems;
      let updatedCartItem;

      if (currentQuantity > 1) {
        updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.sum - action.productPrice,
          selectedCartItem.ownerUsername
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - action.productPrice,
      };

    case REMOVE_FROM_CART:
      updatedCartItems = { ...state.items };
      delete updatedCartItems[action.productId];

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - action.total,
      };

    //   case ADD_ORDER:
    //     return initialState;

    //   case DELETE_PRODUCT:
    //     if (!state.items[action.prodId]){
    //       return state;
    //     }
    //     const updatedItems = {...state.items};
    //     const itemTotal = state.items[action.prodId].sum;
    //     delete updatedItems[action.prodId];
    //     return {
    //       ...state,
    //       items: updatedItems,
    //       totalAmount: state.totalAmount - itemTotal
    //     };
  }

  return state;
};
