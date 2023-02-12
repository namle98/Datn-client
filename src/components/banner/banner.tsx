import React from "react";
import "./styles.scss";

function Banner() {
  return (
    <div className="banner-page-home">
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <div className="icon-boxes-container mt-2 mb-2 bg-transparent">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-lg-4">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-rocket" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">Free Shipping</h3>
                  {/* End .icon-box-title */}
                </div>
                {/* End .icon-box-content */}
              </div>
              {/* End .icon-box */}
            </div>
            {/* End .col-sm-6 col-lg-3 */}
            <div className="col-sm-8 col-lg-4">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-rotate-left" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">Free Returns</h3>
                  {/* End .icon-box-title */}
                  <p>Within 30 days</p>
                </div>
                {/* End .icon-box-content */}
              </div>
              {/* End .icon-box */}
            </div>
            {/* End .col-sm-6 col-lg-3 */}
            <div className="col-sm-8 col-lg-4">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-life-ring" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">We Support</h3>
                  {/* End .icon-box-title */}
                  <p>24/7 amazing services</p>
                </div>
                {/* End .icon-box-content */}
              </div>
              {/* End .icon-box */}
            </div>
            {/* End .col-sm-6 col-lg-3 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
    </div>
  );
}

export default Banner;
