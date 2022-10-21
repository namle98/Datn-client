import { Menu } from "antd";
import { useState } from "react";

const { SubMenu } = Menu;
function Header() {
  const [current, setCurrent] = useState("");
  return (
    <Menu selectedKeys={[current]} mode="horizontal">
      <Menu.Item>Login</Menu.Item>
      <Menu.Item>Register</Menu.Item>
      <Menu.Item>Home</Menu.Item>
    </Menu>
  );
}

export default Header;
