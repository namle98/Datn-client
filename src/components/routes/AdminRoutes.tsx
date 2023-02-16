import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { currentAdmin } from "../../utils/auth";
import LoadingToRedirect from "./LoadingToRedirect";

function AdminRoutes() {
  let { auth, logout } = useAuth();
  const [checkAdmin, setCheckAdmin] = useState(false);

  useEffect(() => {
    if (auth && auth.idToken) {
      currentAdmin(auth.idToken)
        .then((res: AxiosResponse) => setCheckAdmin(true))
        .catch((err: any) => {
          setCheckAdmin(false);
          logout();
        });
    }
  }, [auth]);

  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return checkAdmin ? <Outlet /> : <LoadingToRedirect />;
}

export default AdminRoutes;
