import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import "./styles.scss";
import imgLogo from "../../assets/logoSoict.png";
import { useDispatch, useSelector } from "react-redux";
import MenuMobile from "./menuMobile";
import MenuWeb from "./menuWeb";

function Header() {
  const { logout, auth: user } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const location = useLocation();
  let { cart } = useSelector((state: any) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    location.pathname.includes("register")
      ? setCurrent("register")
      : setCurrent("");
    if (location.pathname.includes("login")) setCurrent("login");
    if (location.pathname === "/") setCurrent("home");
    if (location.pathname === "/shop") setCurrent("shop");
    if (location.pathname === "/cart") setCurrent("cart");
    if (location.pathname === "/admin/dashboard") setCurrent("dashboard");
  }, [location.pathname]);

  useEffect(() => {
    if (showMenuMobile) {
      document.body.classList.add("mmenu-active");
    } else {
      document.body.classList.remove("mmenu-active");
    }
  }, [showMenuMobile]);

  const logoutUser = () => {
    auth.signOut(auth.getAuth());
    logout();
    navigate("/login");
  };

  const handleShowMenuMobile = () => {
    setShowMenuMobile(!showMenuMobile);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
  };

  return (
    <div className="header-container">
      <div className="header-middle sticky-header">
        <MenuWeb
          handleShowMenuMobile={handleShowMenuMobile}
          current={current}
          user={user}
          logoutUser={logoutUser}
          showMenuMobile={showMenuMobile}
          imgLogo={imgLogo}
          cart={cart}
        />
      </div>
      <MenuMobile
        handleShowMenuMobile={handleShowMenuMobile}
        current={current}
        user={user}
        logoutUser={logoutUser}
      />
    </div>
  );
}

export default Header;
