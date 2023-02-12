import imgLogo from "../../assets/logoSoict.png";
import useAuth from "../../hooks/useAuth";

function Footer() {
  const { auth } = useAuth();
  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-lg-4">
              <div className="widget widget-about">
                <img
                  src={imgLogo}
                  className="footer-logo"
                  alt="Footer Logo"
                  width={105}
                  height={25}
                />
                <div className="widget-call">
                  <i className="icon-phone"></i>
                  Call us 24/7
                  <a href="tel:#">+84 972 814 107</a>
                </div>
                <div className="social-icons">
                  <a
                    href="https://www.facebook.com/le.phuongnam.2807/"
                    className="social-icon"
                    target="_blank"
                    title="Facebook"
                  >
                    <i className="icon-facebook-f" />
                  </a>
                  <a
                    href="https://www.instagram.com/_lenam98_/"
                    className="social-icon"
                    target="_blank"
                    title="Instagram"
                  >
                    <i className="icon-instagram" />
                  </a>
                  <a
                    href="https://www.youtube.com/"
                    className="social-icon"
                    target="_blank"
                    title="Youtube"
                  >
                    <i className="icon-youtube" />
                  </a>
                </div>
                {/* End .soial-icons */}
              </div>
              {/* End .widget about-widget */}
            </div>
            {/* End .col-sm-6 col-lg-3 */}
            {/* End .col-sm-6 col-lg-3 */}
            <div className="col-sm-8 col-lg-4">
              <div className="widget">
                <h4 className="widget-title">Customer Service</h4>
                {/* End .widget-title */}
                <ul className="widget-list">
                  <li>
                    <a>Payment Methods</a>
                  </li>
                  <li>
                    <a>Money-back guarantee!</a>
                  </li>
                  <li>
                    <a>Returns</a>
                  </li>
                  <li>
                    <a>Shipping</a>
                  </li>
                  <li>
                    <a>Terms and conditions</a>
                  </li>
                  <li>
                    <a>Privacy Policy</a>
                  </li>
                </ul>
                {/* End .widget-list */}
              </div>
              {/* End .widget */}
            </div>
            {/* End .col-sm-6 col-lg-3 */}
            <div className="col-sm-8 col-lg-4">
              <div className="widget">
                <h4 className="widget-title">My Account</h4>
                {/* End .widget-title */}
                <ul className="widget-list">
                  <li>
                    <a href={auth ? "" : "/login"}>Sign In</a>
                  </li>
                  <li>
                    <a href="/cart">View Cart</a>
                  </li>
                  <li>
                    <a href="/user/wishlist">My Wishlist</a>
                  </li>
                  <li>
                    <a href="/user/history">Track My Order</a>
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
