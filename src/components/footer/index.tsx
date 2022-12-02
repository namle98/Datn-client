import React from "react";
import imgLogo from "../../assets/logoSoict.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="widget widget-about">
                <img
                  src={imgLogo}
                  className="footer-logo"
                  alt="Footer Logo"
                  width={105}
                  height={25}
                />
                <p>
                  Praesent dapibus, neque id cursus ucibus, tortor neque egestas
                  augue, eu vulputate magna eros eu erat.{" "}
                </p>
                <div className="social-icons">
                  <a
                    href="#"
                    className="social-icon"
                    target="_blank"
                    title="Facebook"
                  >
                    <i className="icon-facebook-f" />
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    target="_blank"
                    title="Twitter"
                  >
                    <i className="icon-twitter" />
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    target="_blank"
                    title="Instagram"
                  >
                    <i className="icon-instagram" />
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    target="_blank"
                    title="Youtube"
                  >
                    <i className="icon-youtube" />
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    target="_blank"
                    title="Pinterest"
                  >
                    <i className="icon-pinterest" />
                  </a>
                </div>
                {/* End .soial-icons */}
              </div>
              {/* End .widget about-widget */}
            </div>
            {/* End .col-sm-6 col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Useful Links</h4>
                {/* End .widget-title */}
                <ul className="widget-list">
                  <li>
                    <a href="about.html">About Molla</a>
                  </li>
                  <li>
                    <a href="#">How to shop on Molla</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact us</a>
                  </li>
                  <li>
                    <a href="login.html">Log in</a>
                  </li>
                </ul>
                {/* End .widget-list */}
              </div>
              {/* End .widget */}
            </div>
            {/* End .col-sm-6 col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Customer Service</h4>
                {/* End .widget-title */}
                <ul className="widget-list">
                  <li>
                    <a href="#">Payment Methods</a>
                  </li>
                  <li>
                    <a href="#">Money-back guarantee!</a>
                  </li>
                  <li>
                    <a href="#">Returns</a>
                  </li>
                  <li>
                    <a href="#">Shipping</a>
                  </li>
                  <li>
                    <a href="#">Terms and conditions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
                {/* End .widget-list */}
              </div>
              {/* End .widget */}
            </div>
            {/* End .col-sm-6 col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">My Account</h4>
                {/* End .widget-title */}
                <ul className="widget-list">
                  <li>
                    <a href="#">Sign In</a>
                  </li>
                  <li>
                    <a href="cart.html">View Cart</a>
                  </li>
                  <li>
                    <a href="#">My Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Track My Order</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                </ul>
                {/* End .widget-list */}
              </div>
              {/* End .widget */}
            </div>
            {/* End .col-sm-6 col-lg-3 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      {/* End .footer-middle */}
    </footer>
  );
}

export default Footer;
