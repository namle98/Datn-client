export const couponReducer = (state = false, action: any) => {
  switch (action.type) {
    case "COUPON_APPLIED":
      return action.payload;
    default:
      return state;
  }
};
