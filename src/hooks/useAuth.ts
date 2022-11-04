import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { Auth } from "../models/auth.model";
import { LOGGER_IN_USER, LOGOUT } from "../redux/slice/authSlice";

const useAuth = () => {
  const { auth } = useAppSelector((state: RootState) => state.userReducer);
  const dispatch = useAppDispatch();

  const unsubcribeUser = (user: Auth) => {
    dispatch(LOGGER_IN_USER(user));
  };

  const logout = () => {
    dispatch(LOGOUT());
  };

  return { unsubcribeUser, auth, logout };
};

export default useAuth;
