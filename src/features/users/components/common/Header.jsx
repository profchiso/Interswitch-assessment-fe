import { Flex, Image, Typography, Divider } from "antd";
import Logo from "../../../../assets/react.svg";
const { Text } = Typography;
import { useLocation } from "react-router-dom";

const AuthHeader = () => {
  const { pathname } = useLocation();
  console.log("nave", pathname);
  return (
    <>
      <Flex
        vertical
        gap="middle"
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Flex>
          <Image src={Logo} alt="App-Logo" width="60px" height="60px" />
        </Flex>
        <Divider>
          <Text title="secondary">
            {pathname === "/" ? "Login to your account" : "Create new account"}
          </Text>
        </Divider>
      </Flex>
    </>
  );
};

export default AuthHeader;
