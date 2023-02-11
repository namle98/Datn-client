import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { currentUser } from "../../utils/auth";
import LoadingToRedirect from "./LoadingToRedirect";

function UserRoutes() {
  let { auth, logout } = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth && auth.idToken) {
      currentUser(auth.idToken)
        .then((res) => {
          console.log("CURRENT USER RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("USER ROUTE ERR", err);
          logout();
          setOk(false);
        });
    }
  }, [auth]);
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return ok ? <Outlet /> : <LoadingToRedirect />;
}

export default UserRoutes;
