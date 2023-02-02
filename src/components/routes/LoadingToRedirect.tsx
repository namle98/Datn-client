import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="loading-to-redirect">
      <div className="container p-5 text-center">
        <p> Redirecting you in {count} seconds</p>
      </div>
    </div>
  );
}

export default LoadingToRedirect;
