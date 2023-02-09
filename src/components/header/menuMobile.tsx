import {
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import SearchFormMobile from "./searchFormMobile";

function MenuMobile({ handleShowMenuMobile, current, user, logoutUser }: any) {
  return (
    <>
      <div className="mobile-menu-overlay"></div>

      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close" onClick={handleShowMenuMobile}>
            <i className="icon-close"></i>
          </span>

          <SearchFormMobile />

          <nav className="mobile-nav">
            <ul className="mobile-menu">
              <li className={` ${current === "home" ? "active" : ""}`}>
                <Link to="/">
                  <HomeOutlined style={{ fontSize: "14px" }} />{" "}
                  <span style={{ color: "white" }}>Home</span>
                </Link>
              </li>
              <li className={`${current === "shop" ? "active" : ""}`}>
                <Link to="/shop">
                  <ShoppingOutlined style={{ fontSize: "14px" }} />{" "}
                  <span style={{ color: "white" }}>Shop</span>
                </Link>
              </li>

              {!user ? (
                <li className={`${current === "login" ? "active" : ""}`}>
                  <Link to="/login">
                    <UserAddOutlined style={{ fontSize: "14px" }} />{" "}
                    <span style={{ color: "white" }}>Login</span>
                  </Link>
                </li>
              ) : (
                <>
                  {user && user.role === "subscriber" && (
                    <li
                      className={` ${current === "dashboard" ? "active" : ""}`}
                    >
                      <Link to="/user/history">
                        <DashboardOutlined style={{ fontSize: "14px" }} />{" "}
                        <span style={{ color: "white" }}>Dashboard</span>
                      </Link>
                    </li>
                  )}
                  {user && user.role === "admin" && (
                    <li
                      className={` ${current === "dashboard" ? "active" : ""}`}
                    >
                      <Link to="/admin/dashboard">
                        <DashboardOutlined style={{ fontSize: "14px" }} />{" "}
                        <span style={{ color: "white" }}>Dashboard</span>
                      </Link>
                    </li>
                  )}
                  <li onClick={logoutUser}>
                    <Link to="/login">
                      <LogoutOutlined style={{ fontSize: "14px" }} />{" "}
                      <span style={{ color: "white" }}>Logout</span>
                    </Link>
                  </li>
                  <li className="show-user-name">
                    <Link to="#">
                      <UserOutlined style={{ fontSize: "14px" }} />{" "}
                      <span style={{ color: "white" }}>{user?.name}</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="social-icons">
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Facebook"
            >
              <i className="icon-facebook-f"></i>
            </a>
            <a href="#" className="social-icon" target="_blank" title="Twitter">
              <i className="icon-twitter"></i>
            </a>
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Instagram"
            >
              <i className="icon-instagram"></i>
            </a>
            <a href="#" className="social-icon" target="_blank" title="Youtube">
              <i className="icon-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuMobile;
