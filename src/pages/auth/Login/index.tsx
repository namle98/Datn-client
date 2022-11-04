import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../../firebase";
import useAuth from "../../../hooks/useAuth";

function Login() {
  const { unsubcribeUser } = useAuth();
  const navigate = useNavigate();
  const [form] = useForm();
  const [disabledSave, setDisabledSave] = useState(true);
  const { auth: user } = useAuth();

  useEffect(() => {
    if (user && user.idToken) navigate("/");
  }, [user]);

  const handleFormChange = () => {
    console.log(form.getFieldsValue());
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.getFieldsValue().email ||
      !form.getFieldsValue().password;
    setDisabledSave(hasErrors);
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(auth.getAuth(), googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        if (user.email) {
          unsubcribeUser({
            email: user.email,
            idToken: idTokenResult.token,
          });
        }
        navigate("/");
      })
      .catch((error) => toast.error(error.toString().slice(24)));
  };

  const login = async (e: any) => {
    try {
      const result = await auth.signInWithEmailAndPassword(
        auth.getAuth(),
        e.email,
        e.password
      );
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      if (user.email) {
        unsubcribeUser({
          email: user.email,
          idToken: idTokenResult.token,
        });
      }
      navigate("/");
    } catch (error: any) {
      toast.error(error.toString().slice(24));
    }
  };

  return (
    <div className="login-page">
      <div className="form-login">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={login}
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
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={disabledSave}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Button onClick={googleLogin} type="primary">
          login with email
        </Button>
        <Link to="/forgot/password"> Forgot Password</Link>
      </div>
    </div>
  );
}

export default Login;
