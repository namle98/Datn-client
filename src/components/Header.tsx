import { Menu } from "antd";
import { useEffect, useState } from "react";
import { HomeOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
const { Item } = Menu;
function Header() {
  const [current, setCurrent] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setCurrent("home");
    if (location.pathname === "/login") setCurrent("login");
    if (location.pathname === "/register") setCurrent("register");
  }, [location.pathname]);

  const handleSwitchMenu = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleSwitchMenu} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="login" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>
    </Menu>
  );
}

export default Header;
