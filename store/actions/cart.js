export const ADD_TO_CART = "ADD_TO_CART";
export const REDUCE_FROM_CART = "REDUCE_FROM_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (productId, productPrice, ownerUsername) => {
  // console.log("CART ACTIONS OWNER USERNAME PASSED FROM DISPATCH:");
  // console.log(ownerUsername);
  return { type: ADD_TO_CART, productId, productPrice, ownerUsername };
};

export const reduceFromCart = (productId, productPrice) => {
  return { type: REDUCE_FROM_CART, productId, productPrice };
};

export const removeFromCart = (productId, total) => {
  return { type: REMOVE_FROM_CART, productId, total };
};

export const clearCart = () => {
  return { type: CLEAR_CART };
};
