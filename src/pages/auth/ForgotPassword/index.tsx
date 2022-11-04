import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../firebase";
import useAuth from "../../../hooks/useAuth";

function ForgotPassword() {
  const [form] = useForm();
  const [disabledSave, setDisabledSave] = useState(true);
  const { auth: user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.idToken) navigate("/");
  }, [user]);

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const onFinish = async (e: any) => {
    if (process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT) {
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp: true,
      };
      await auth
        .sendPasswordResetEmail(auth.getAuth(), e.email, config)
        .then(() => {
          toast.success("Check your email for password reset link");
        })
        .catch((error: any) => {
          toast.error(error.toString().slice(24));
        });
    }
  };

  const onFinishFailed = (e: any) => {
    console.log(e);
  };
  return (
    <div className="form-register">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFieldsChange={handleFormChange}
        form={form}
      >
        <Form.Item
          label="Email"
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
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={disabledSave}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPassword;
