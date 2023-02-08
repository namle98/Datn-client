let initialState: any = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    initialState = JSON.parse(cartData);
  } else {
    initialState = [];
  }
}

export const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};
