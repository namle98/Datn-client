export const CODReducer = (state = false, action: any) => {
  switch (action.type) {
    case "COD":
      return action.payload;
    default:
      return state;
  }
};
