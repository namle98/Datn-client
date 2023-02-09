import {
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "./searchForm";

function MenuWeb({
  handleShowMenuMobile,
  showMenuMobile,
  imgLogo,
  current,
  cart,
  user,
  logoutUser,
}: any) {
  return (
    <div className="container">
      <div className="header-left">
        <button
          onClick={handleShowMenuMobile}
          className={`mobile-menu-toggler ${showMenuMobile ? "active" : ""}`}
        >
          <span className="sr-only">Toggle mobile menu</span>
          <i className="icon-bars" />
        </button>
        <Link to="/" className="logo">
          <img src={imgLogo} alt="Molla Logo" width={45} height={45} />
        </Link>
        <nav className="main-nav">
          <ul className="menu sf-arrows">
            <li
              className={`megamenu-container ${
                current === "home" ? "active" : ""
              }`}
            >
              <Link to="/">
                <Tooltip placement="bottom" color="#1890ff" title={"Home"}>
                  <HomeOutlined style={{ fontSize: "22px" }} />
                </Tooltip>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="main-nav">
          <ul className="menu sf-arrows">
            <li
              className={`megamenu-container ${
                current === "shop" ? "active" : ""
              }`}
            >
              <Link to="/shop">
                <Tooltip placement="bottom" color="#1890ff" title={"Shop"}>
                  <ShoppingOutlined style={{ fontSize: "22px" }} />
                </Tooltip>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <SearchForm />
        <div className="dropdown cart-dropdown">
          <Link
            to={"/cart"}
            className={`dropdown-toggle `}
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-display="static"
          >
            <Tooltip placement="bottom" color="#1890ff" title={"Cart"}>
              <i
                className={`icon-shopping-cart ${
                  current === "cart" ? "active" : ""
                }`}
              />
              <span className="cart-count">{cart.length}</span>
            </Tooltip>
          </Link>
        </div>
        <nav className="main-nav">
          <ul className="menu sf-arrows">
            {!user ? (
              <li
                className={`megamenu-container ${
                  current === "login" ? "active" : ""
                }`}
              >
                <Link to="/login">
                  <Tooltip placement="bottom" color="#1890ff" title={"Login"}>
                    <UserAddOutlined style={{ fontSize: "22px" }} />
                  </Tooltip>
                </Link>
              </li>
            ) : (
              <li>
                <span className="sf-with-ul">{user?.name}</span>
                <ul>
                  {user && user.role === "subscriber" && (
                    <li>
                      <Link to="/user/history">
                        <DashboardOutlined style={{ fontSize: "14px" }} />
                        &nbsp; Dashboard
                      </Link>
                    </li>
                  )}
                  {user && user.role === "admin" && (
                    <li>
                      <Link to="/admin/dashboard">
                        <DashboardOutlined style={{ fontSize: "14px" }} />
                        &nbsp; Dashboard
                      </Link>
                    </li>
                  )}
                  <li onClick={logoutUser}>
                    <Link to="/login">
                      <LogoutOutlined style={{ fontSize: "14px" }} />
                      &nbsp; Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          {/* End .menu */}
        </nav>
      </div>
    </div>
  );
}

export default MenuWeb;
