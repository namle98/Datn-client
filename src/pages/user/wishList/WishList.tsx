import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

function WishList() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirectToPage = (url: string) => {
    navigate(url);
  };
  return (
    <div className="wish-list-page">
      <div className="container">
        <div className="menu-user">
          <ul>
            <li onClick={() => redirectToPage("/user/history")}>History</li>

            <li onClick={() => redirectToPage("/user/password")}>Password</li>

            <li
              className={`${pathname.includes("wishlist") ? "active" : ""}`}
              onClick={() => redirectToPage("/user/wishlist")}
            >
              WishList
            </li>
          </ul>
        </div>
        <div className="content"> wishList</div>
      </div>
    </div>
  );
}

export default WishList;
