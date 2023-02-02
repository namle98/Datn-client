import { Form } from "antd";
import { useForm } from "antd/es/form/Form";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import { auth } from "../../../firebase";
import useAuth from "../../../hooks/useAuth";

function ForgotPassword() {
  const [form] = useForm();
  const [disabledSave, setDisabledSave] = useState(true);
  const { auth: user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.idToken) navigate("/");
  }, [user]);

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const onFinish = async (e: any) => {
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT || "",
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(auth.getAuth(), e.email, config)
      .then(() => {
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.toString().slice(24));
      });
  };

  return (
    <div className="form-register">
      {loading && <LoadingSpinner />}

      <div className="login-page">
        <div className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17">
          <div className="container">
            <div className="form-box">
              <div className="form-tab">
                <ul className="nav nav-pills nav-fill" role="tablist">
                  <li className="nav-item">
                    <div
                      className="nav-link active"
                      id="signin-tab-2"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="signin-2"
                      aria-selected="false"
                    >
                      Forgot Password
                    </div>
                  </li>
                </ul>
                <div
                  className="tab-pane fade show active"
                  id="register-2"
                  role="tabpanel"
                  aria-labelledby="register-tab-2"
                >
                  <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    onFieldsChange={handleFormChange}
                    form={form}
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <div className="form-group">
                        <label htmlFor="register-email-2">
                          Your email address *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="register-email-2"
                          name="register-email"
                          required
                        />
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <div className="form-footer">
                        <button
                          type="submit"
                          className="btn btn-outline-primary-2"
                          disabled={disabledSave}
                        >
                          <span>Submit</span>
                          <i className="icon-long-arrow-right" />
                        </button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
