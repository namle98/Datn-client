import { put, takeEvery } from "redux-saga/effects";
import { auth } from "../../firebase";
import { LOGGER_IN_USER } from "../slice/authSlice";

function* login() {
  // const unsubcribe = auth.onAuthStateChanged(
  //   auth.getAuth(),
  //   yield (user: any) => {
  //     if (user) {
  //       return user.getIdTokenResult();
  //     }
  //   }
  // );
  // yield put(LOGGER_IN_USER(unsubcribe()));
}

export function* userSaga() {
  console.log("sdfas");
}
