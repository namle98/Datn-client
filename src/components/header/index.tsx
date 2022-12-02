import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import "./styles.scss";
import imgLogo from "../../assets/logoSoict.png";

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
                      <HomeOutlined style={{ fontSize: "20px" }} />
                    </Tooltip>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <div className="header-search">
              <a
                href="#"
                className="search-toggle"
                role="button"
                title="Search"
              >
                <i className="icon-search" />
              </a>
              <form action="#" method="get">
                <div className="header-search-wrapper">
                  <label htmlFor="q" className="sr-only">
                    Search
                  </label>
                  <input
                    type="search"
                    className="form-control"
                    name="q"
                    id="q"
                    placeholder="Search in..."
                    required
                  />
                </div>
              </form>
            </div>
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
                        <UserAddOutlined style={{ fontSize: "20px" }} />
                      </Tooltip>
                    </Link>
                  </li>
                ) : (
                  <li className="sub-menu-hover">
                    <span className="sf-with-ul">{user?.name}</span>
                    <ul>
                      <li onClick={logoutUser}>
                        <LogoutOutlined style={{ fontSize: "14px" }} />
                        &nbsp; Logout
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
