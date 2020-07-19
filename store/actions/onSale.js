export const STORE_PRODUCTS_ON_SALE = "STORE_PRODUCTS_ON_SALE";

export const getOnSale = (id) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;

    const allProducts = getState().products.availableProducts;

    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/onSale/${id}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let productsOnSale = [];

      for (const key in responseData) {
        productsOnSale.push({
          key,
          previousPrice: responseData[key].previousPrice,
          product: allProducts.filter(
            (product) => product.id === responseData[key].productId
          )[0],
        });
      }

      //   console.log("PRODUCTS ON SALE: ");
      //   console.log(productsOnSale);

      dispatch({
        type: STORE_PRODUCTS_ON_SALE,
        productsOnSale,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
