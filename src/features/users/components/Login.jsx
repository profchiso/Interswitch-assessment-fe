import { Flex, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import AuthLayout from "./common/Layout";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    if (!sessionStorage.getItem("isAuthenticated")) {
      sessionStorage.setItem("isAuthenticated", true);
      navigate("/dashboard/users");
    }

    navigate("/dashboard/users");
  };
  return (
    <AuthLayout>
      <Flex vertical justify="space-between" gap="middle">
        <Flex>
          <Input placeholder="Enter email" prefix={<MailOutlined />} />
        </Flex>
        <Flex>
          <Input.Password
            placeholder="Enter password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
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
