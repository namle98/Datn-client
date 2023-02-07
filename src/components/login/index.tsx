import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../utils/auth";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface LoginProps {
  googleLogin: () => void;
}

function Login({ googleLogin }: LoginProps) {
  const { unsubcribeUser } = useAuth();
  const navigate = useNavigate();
  const [form] = useForm();
  const [disabledSave, setDisabledSave] = useState(true);

  const handleFormChange = () => {
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.getFieldsValue().email ||
      !form.getFieldsValue().password;
    setDisabledSave(hasErrors);
  };

  const roleBasedRedirect = (res: AxiosResponse) => {
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/history");
    }
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
      createOrUpdateUser(idTokenResult.token)
        .then((res: AxiosResponse) => {
          unsubcribeUser({
            email: res.data.email,
            idToken: idTokenResult.token,
            name: res.data.name,
            role: res.data.role,
            _id: res.data._id,
          });
          let url = localStorage.getItem("url");
          if (url) {
            navigate(url);
          } else {
            roleBasedRedirect(res);
          }
        })
        .catch((err: any) => console.log(err));
    } catch (error: any) {
      toast.error(error.toString().slice(24));
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="signin-2"
      role="tabpanel"
      aria-labelledby="signin-tab-2"
    >
      <Form
        name="basic"
        onFinish={login}
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
            <label htmlFor="singin-email-2">Email address *</label>
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
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
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
        <Form.Item>
          <div className="form-footer">
            <button
              type="submit"
              className="btn btn-outline-primary-2"
              disabled={disabledSave}
            >
              <span>LOG IN</span>
              <i className="icon-long-arrow-right" />
            </button>
            <Link to="/forgot/password" className="forgot-link">
              Forgot Your Password?
            </Link>
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

export default Login;
