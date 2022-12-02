import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { auth } from "../../../firebase";
import "./index.scss";
import { updatePassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import { AxiosResponse } from "axios";
import useAuth from "../../../hooks/useAuth";
import { createOrUpdateUser } from "../../../utils/auth";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import bgLogin from "../../../assets/backgroundLogin.jpg";

function RegisterComplete() {
  const [email, setEmail] = useState<string | null>("");
  const navigate = useNavigate();
  const { unsubcribeUser } = useAuth();
  const [form] = useForm();
  const [disabledSave, setDisabledSave] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFormChange = () => {
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.getFieldsValue().email ||
      !form.getFieldsValue().password ||
      !form.getFieldsValue().userName ||
      !form.getFieldsValue().confirm;
    setDisabledSave(hasErrors);
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
  }, []);

  const completeRegistration = async (e: any) => {
    setLoading(true);
    try {
      const result = await auth.signInWithEmailLink(
        auth.getAuth(),
        e.email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForSignIn");
        let user = auth.getAuth().currentUser;
        if (user) {
          await updateProfile(user, {
            displayName: e.userName,
          });
          await updatePassword(user, e.password);
        }
        const idTokenResult = await user?.getIdTokenResult();
        createOrUpdateUser(idTokenResult?.token)
          .then((res: AxiosResponse) => {
            unsubcribeUser({
              email: res.data.email,
              idToken: idTokenResult?.token,
              name: res.data.name,
              role: res.data.role,
              _id: res.data._id,
            });
          })
          .catch((err: any) => console.log(err));
      }
      setLoading(false);
      toast.success("Register Success");
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.toString().slice(24));
    }
  };

  return (
    <div className="register-complete-page">
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
                      Register Complete
                    </div>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="signin-2"
                    role="tabpanel"
                    aria-labelledby="signin-tab-2"
                  >
                    <Form
                      name="basic"
                      onFinish={completeRegistration}
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
                          <label htmlFor="singin-email-2">
                            Email address *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="singin-email-2"
                            name="singin-email"
                            required
                          />
                        </div>
                      </Form.Item>
                      <Form.Item
                        name="userName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <div className="form-group">
                          <label htmlFor="singin-password-2">User Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="singin-password-2"
                            required
                          />
                        </div>
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please enter the password in the correct format!",
                            pattern: new RegExp(
                              "(?=.*[a-z])(?=.*[A-Z]).{8,15}"
                            ),
                          },
                        ]}
                        hasFeedback
                      >
                        <div className="form-group">
                          <label htmlFor="singin-password-2">Password *</label>
                          <input
                            type="password"
                            className="form-control"
                            id="singin-password-2"
                            name="singin-password"
                            required
                          />
                        </div>
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "The two passwords that you entered do not match!"
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <div className="form-group">
                          <label htmlFor="singin-password-2">
                            Confirm Password *
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="singin-password-2"
                            name="singin-password"
                            required
                          />
                        </div>
                      </Form.Item>
                      <ul className="note-pws">
                        <li>* Minimum eight characters</li>
                        <li>* At least one uppercase letter</li>
                        <li>* At least one lowercase letter and one number</li>
                      </ul>
                      <div>
                        <Form.Item>
                          <div className="form-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-primary-2"
                              disabled={disabledSave}
                            >
                              <span>Register Complete</span>
                              <i className="icon-long-arrow-right" />
                            </button>
                          </div>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
