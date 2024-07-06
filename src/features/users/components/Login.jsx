/* eslint-disable react/prop-types */
import { useState } from "react";
import { Flex, Input, Button, App } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import AuthLayout from "./common/Layout";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        notification.error({
          message: "Login",
          placement: "top",
          description: "All fields are required",
        });
        return;
      }
      const res = await fetch("http://localhost:5001/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const jsonData = await res.json();

      if (jsonData.responseText === "FAIL") {
        notification.error({
          message: "Login",
          placement: "top",
          description: jsonData.errors[0].msg,
        });
        return;
      }

      notification.success({
        message: "Login",
        placement: "top",
        description: jsonData.data.msg,
      });
      sessionStorage.setItem("isAuthenticated", true);
      sessionStorage.setItem("accessToken", jsonData.data.extra.accessToken);
      setIsAuthenticated(true);
      // Logging for debugging
      console.log("Navigating to /dashboard/users");
      navigate("/dashboard/users");
    } catch (error) {
      notification.error({
        message: "Login",
        placement: "top",
        description: "An error occurred. Please try again.",
      });
    }
  };
  return (
    <AuthLayout>
      <Flex vertical justify="space-between" gap="middle">
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
          <Button onClick={handleLogin} type="primary">
            Login
          </Button>
        </Flex>
        <Flex>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
