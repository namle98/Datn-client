import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../../firebase";
import useAuth from "../../../hooks/useAuth";
import { createOrUpdateUser } from "../../../utils/auth";
import LoginTab from "../../../components/login";
import RegisterTab from "../../../components/register";
import "./styles.scss";

export type Tablist = "Login" | "Register";

function Login() {
  const { unsubcribeUser } = useAuth();
  const navigate = useNavigate();

  const { auth: user } = useAuth();

  const [tab, setTab] = useState<Tablist>("Login");

  // useEffect(() => {
  //   if (user && user.idToken) navigate("/");
  // }, [user]);

  // useEffect(() => {
  //   if (user && user.idToken) navigate("/user/history");
  // }, [user]);

  const onClickTabLogin = () => {
    setTab("Login");
  };
  const onClickRegister = () => {
    setTab("Register");
  };

  const roleBasedRedirect = (res: AxiosResponse) => {
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/history");
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(auth.getAuth(), googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res: AxiosResponse) => {
            unsubcribeUser({
              email: res.data.email,
              idToken: idTokenResult.token,
              name: res.data.name,
              role: res.data.role,
              _id: res.data._id,
            });
            roleBasedRedirect(res);
          })

          .catch();
      })
      .catch((error) => toast.error(error.toString().slice(24)));
  };

  return (
    <div className="login-page-container">
      <div className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17">
        <div className="container">
          <div className="form-box">
            <div className="form-tab">
              <ul className="nav nav-pills nav-fill" role="tablist">
                <li className="nav-item" onClick={onClickTabLogin}>
                  <div
                    className={`nav-link ${tab === "Login" ? "active" : ""}`}
                    id="signin-tab-2"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="signin-2"
                    aria-selected="false"
                  >
                    Sign In
                  </div>
                </li>
                <li className="nav-item" onClick={onClickRegister}>
                  <div
                    className={`nav-link ${tab === "Register" ? "active" : ""}`}
                    id="register-tab-2"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="register-2"
                    aria-selected="true"
                  >
                    Register
                  </div>
                </li>
              </ul>
              <div className="tab-content">
                {tab === "Login" ? (
                  <LoginTab googleLogin={googleLogin} />
                ) : (
                  <RegisterTab googleLogin={googleLogin} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
