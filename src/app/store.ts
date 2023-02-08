import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { cartReducer } from "../redux/reducer/cartReducer";
import { CODReducer } from "../redux/reducer/CODReducer";
import { couponReducer } from "../redux/reducer/couponReducer";
import { drawerReducer } from "../redux/reducer/drawerReducer";
import { searchReducer } from "../redux/reducer/searchReducer";
import userReducer from "../redux/slice/authSlice";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    coupon: couponReducer,
    COD: CODReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
