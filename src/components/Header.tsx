import { Menu } from "antd";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
const { Item } = Menu;
function Header() {
  const { logout, auth: user } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const location = useLocation();

  useEffect(() => {
    location.pathname.includes("register")
      ? setCurrent("register")
      : setCurrent("home");
    if (location.pathname.includes("login")) setCurrent("login");
  }, [location.pathname]);

  const handleSwitchMenu = (e: any) => {
    setCurrent(e.key);
  };

  const logoutUser = () => {
    auth.signOut(auth.getAuth());
    logout();
    navigate("/login");
  };

  return (
    <Menu onClick={handleSwitchMenu} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!user && (
        <Item key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <Item key="logout" icon={<LogoutOutlined />} onClick={logoutUser}>
          Logout
        </Item>
      )}
      {!user && (
        <Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>
      )}
    </Menu>
  );
}

export default Header;
