import { Flex, Input, Button, App } from "antd";
import { Link } from "react-router-dom";
import {
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import AuthLayout from "./common/Layout";

const Register = () => {
  const { notification } = App.useApp();
  // const navigate = useNavigate();
  const handleRegister = () => {
    notification.success({
      message: "Registration",
      placement: "top",
      description: "Your registration is successfully ",
    });
    // navigate("/");
  };
  return (
    <AuthLayout>
      <Flex vertical gap="middle">
        <Flex>
          <Input placeholder="Enter name" prefix={<UserOutlined />} />
        </Flex>
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
          <Button onClick={handleRegister} type="primary">
            Register
          </Button>
        </Flex>
        <Flex>
          Already have an account? <Link to="/">Login</Link>
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default Register;
