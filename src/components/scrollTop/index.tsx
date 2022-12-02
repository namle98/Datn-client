import React, { useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import "./styles.scss";
import { Tooltip } from "antd";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setVisible(true);
    } else if (scrolled <= 100) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Tooltip placement="bottom" color="#1890ff" title={"Back to top"}>
      <div
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
        className="scorll-top-btn"
      >
        <ArrowUpOutlined className="icon-btn-back-to-top" />
      </div>
    </Tooltip>
  );
};

export default ScrollButton;
