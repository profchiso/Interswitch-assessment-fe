import { useState } from "react";
import { Flex, Input, Button, App } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import AuthLayout from "./common/Layout";

const Register = () => {
  const { notification } = App.useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (!name || !email || !password) {
      notification.error({
        message: "Registration",
        placement: "top",
        description: "All fields are required",
      });

      return;
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const jsonData = await res.json();
    console.log(jsonData);
    if (jsonData.responseText === "FAIL") {
      notification.error({
        message: "Registration",
        placement: "top",
        description: jsonData.errors[0].msg,
      });
      return;
    }

    notification.success({
      message: "Registration",
      placement: "top",
      description: jsonData.data.msg,
    });
    navigate("/");
  };
  return (
    <AuthLayout>
      <Flex vertical gap="middle">
        <Flex>
          <Input
            placeholder="Enter name"
            prefix={<UserOutlined />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Flex>
        <Flex>
          <Input
            placeholder="Enter email"
            prefix={<MailOutlined />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Flex>
        <Flex>
          <Input.Password
            placeholder="Enter password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Flex>
        <Flex>
          <Button onClick={handleRegister} type="primary">
            Register
          </Button>
        </Flex>
        <Flex>
          Already have an account? &nbsp; <Link to="/">Login</Link>
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default Register;
