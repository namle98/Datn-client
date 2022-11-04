import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Register() {
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
    if (process.env.REACT_APP_REGISTER_REDIRECT_URL) {
      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };
      await auth.sendSignInLinkToEmail(auth.getAuth(), e.email, config);
      toast.success(
        `Email is sent to ${e.email}. Click the link to complete your registration`
      );
      window.localStorage.setItem("emailForSignIn", e.email);
    }
  };

  const onFinishFailed = (e: any) => {
    console.log(e);
  };

  return (
    <div className="register-page">
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={disabledSave}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
