import React from "react";
import "./index.scss";
function LoadingSpinner() {
  return (
    <div className="loading">
      <div className="lds-hourglass"></div>
    </div>
  );
}

export default LoadingSpinner;
