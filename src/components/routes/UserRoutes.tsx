import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function UserRoutes() {
  let { auth } = useAuth();
  let location = useLocation();
  const [checkUser, setCheckUser] = useState(true);

  useEffect(() => {
    if (!auth) setCheckUser(false);
  }, [auth]);

  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return !checkUser ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    <Outlet />
  );
}

export default UserRoutes;
