import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { auth } from "../../../firebase";
import "./index.scss";
import { updatePassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";

function RegisterComplete() {
  const [email, setEmail] = useState<string | null>("");
  const navigate = useNavigate();
  const [form] = useForm();
  const [disabledSave, setDisabledSave] = useState(true);

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
          await updatePassword(user, e.password);
          await updateProfile(user, {
            displayName: e.userName,
          });
        }
        const idTokenResult = await user?.getIdTokenResult();
        console.log("user", user);
        console.log("idTokenResult", idTokenResult);
      }
      toast.success("Register Success");
      navigate("/");
    } catch (error: any) {
      toast.error(error.toString().slice(24));
    }
  };

  return (
    <div className="register-page">
      <div className="form-register">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={completeRegistration}
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
            <Input defaultValue={email ? email : ""} />
          </Form.Item>
          <Form.Item
            label="User Name"
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter the password in the correct format!",
                pattern: new RegExp("(?=.*[a-z])(?=.*[A-Z]).{8,15}"),
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
            <Input.Password />
          </Form.Item>
          <div>
            Minimum eight characters, at least one uppercase letter, one
            lowercase letter and one number
          </div>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={disabledSave}>
              Register Complete
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterComplete;
