import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

function UserNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirectToPage = (url: string) => {
    navigate(url);
  };
  return (
    <div className="user-nav-page">
      <div className="menu-user">
        <ul>
          <li
            onClick={() => redirectToPage("/user/history")}
            className={`${pathname.includes("history") ? "active" : ""}`}
          >
            History
          </li>

          <li onClick={() => redirectToPage("/user/password")}>Password</li>

          <li onClick={() => redirectToPage("/user/wishlist")}>WishList</li>
        </ul>
      </div>
    </div>
  );
}

export default UserNav;
