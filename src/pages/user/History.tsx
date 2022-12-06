import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

function HistoryPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirectToPage = (url: string) => {
    navigate(url);
  };

  return (
    <div className="history-page">
      <div className="container">
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
        <div className="content"> history</div>
      </div>
    </div>
  );
}

export default HistoryPage;
