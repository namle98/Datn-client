import { all } from "redux-saga/effects";
import { userSaga } from "../redux/saga/authSaga";

export default function* rootSaga() {
  yield all([userSaga()]);
}
