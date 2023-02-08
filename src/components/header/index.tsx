import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import "./styles.scss";
import imgLogo from "../../assets/logoSoict.png";
import SearchForm from "./searchForm";

function Header() {
  const { logout, auth: user } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const location = useLocation();

  useEffect(() => {
    location.pathname.includes("register")
      ? setCurrent("register")
      : setCurrent("");
    if (location.pathname.includes("login")) setCurrent("login");
    if (location.pathname === "/") setCurrent("home");
    if (location.pathname === "/shop") setCurrent("shop");
  }, [location.pathname]);

  const logoutUser = () => {
    auth.signOut(auth.getAuth());
    logout();
    navigate("/login");
  };

  return (
    <div className="header-container">
      <div className="header-middle sticky-header">
        <div className="container">
          <div className="header-left">
            <button className="mobile-menu-toggler">
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
              <a
                href="#"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static"
              >
                <i className="icon-shopping-cart" />
                <span className="cart-count">2</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-cart-products">
                  <div className="product">
                    <div className="product-cart-details">
                      <h4 className="product-title">
                        <a href="product.html">
                          Beige knitted elastic runner shoes
                        </a>
                      </h4>
                      <span className="cart-product-info">
                        <span className="cart-product-qty">1</span>x $84.00
                      </span>
                    </div>
                    <figure className="product-image-container">
                      <a href="product.html" className="product-image">
                        <img
                          src="assets/images/products/cart/product-1.jpg"
                          alt="product"
                        />
                      </a>
                    </figure>
                    <a href="#" className="btn-remove" title="Remove Product">
                      <i className="icon-close" />
                    </a>
                  </div>
                  <div className="product">
                    <div className="product-cart-details">
                      <h4 className="product-title">
                        <a href="product.html">
                          Blue utility pinafore denim dress
                        </a>
                      </h4>
                      <span className="cart-product-info">
                        <span className="cart-product-qty">1</span>x $76.00
                      </span>
                    </div>
                    <figure className="product-image-container">
                      <a href="product.html" className="product-image">
                        <img
                          src="assets/images/products/cart/product-2.jpg"
                          alt="product"
                        />
                      </a>
                    </figure>
                    <a href="#" className="btn-remove" title="Remove Product">
                      <i className="icon-close" />
                    </a>
                  </div>
                </div>
                <div className="dropdown-cart-total">
                  <span>Total</span>
                  <span className="cart-total-price">$160.00</span>
                </div>
                <div className="dropdown-cart-action">
                  <a href="cart.html" className="btn btn-primary">
                    View Cart
                  </a>
                  <a href="checkout.html" className="btn btn-outline-primary-2">
                    <span>Checkout</span>
                    <i className="icon-long-arrow-right" />
                  </a>
                </div>
              </div>
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
                      <Tooltip
                        placement="bottom"
                        color="#1890ff"
                        title={"Login"}
                      >
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
      </div>
    </div>
  );
}

export default Header;
