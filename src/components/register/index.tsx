import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

interface RegisterProps {
  googleLogin: () => void;
}

function Register({ googleLogin }: RegisterProps) {
  const [form] = useForm();
  const [disabledSave, setDisabledSave] = useState(true);

  const onFinish = async (e: any) => {
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL || "",
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(auth.getAuth(), e.email, config);
    toast.success(
      `Email is sent to ${e.email}. Click the link to complete your registration`
    );
    window.localStorage.setItem("emailForSignIn", e.email);
  };

  const handleFormChange = () => {
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.getFieldsValue().email;
    setDisabledSave(hasErrors);
  };

  return (
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
            <label htmlFor="register-email-2">Your email address *</label>
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
              <span>SIGN UP</span>
              <i className="icon-long-arrow-right" />
            </button>
          </div>
        </Form.Item>
      </Form>
      <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div onClick={googleLogin} className="row">
          <div className="col-sm-12">
            <div className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
