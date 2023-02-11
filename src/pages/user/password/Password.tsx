import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { updatePassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import UserNav from "../../../components/userNav/userNav";
import { auth } from "../../../firebase";
import "./styles.scss";

function Password() {
  const [form] = useForm();
  const [disabledSave, setDisabledSave] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFormChange = () => {
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.getFieldsValue().password ||
      !form.getFieldsValue().confirm;
    setDisabledSave(hasErrors);
  };

  const changePassword = async (e: any) => {
    setLoading(true);
    let user = auth.getAuth().currentUser;
    if (user) {
      await updatePassword(user, e.password)
        .then(() => {
          setLoading(false);
          toast.success("Changed password success");
        })
        .catch((err: any) => {
          setLoading(false);
          console.log(err);
          toast.error(err.toString().slice(24));
        });
    }
  };

  return (
    <div className="password-page">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col-md-10">
            <div className="content">
              <div className="title-page">Change Password</div>
              <div
                className="tab-pane fade show active"
                id="signin-2"
                role="tabpanel"
                aria-labelledby="signin-tab-2"
              >
                <Form
                  name="basic"
                  onFinish={changePassword}
                  autoComplete="off"
                  onFieldsChange={handleFormChange}
                  form={form}
                >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter the password in the correct format!",
                        pattern: new RegExp("(?=.*[a-z])(?=.*[A-Z]).{8,15}"),
                      },
                    ]}
                    hasFeedback
                  >
                    <div className="form-group">
                      <label htmlFor="singin-password-2">New Password *</label>
                      <input
                        type="password"
                        className="form-control"
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
                    <div className="form-group">
                      <label htmlFor="singin-password-2">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
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
                          disabled={disabledSave || loading}
                        >
                          <span>Save</span>
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
  );
}

export default Password;
