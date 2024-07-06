import { Layout, Flex } from "antd";

import AuthFooter from "./Footer";
import AuthHeader from "./Header";

const layoutStyle = {
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  height: "100vh",
  width: "100vw",
  "background-color": "#D1D8C5",
};

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children }) => {
  return (
    <Layout style={layoutStyle}>
      <Flex vertical gap="middle">
        <Flex style={{ display: "flex", justifyContent: "center" }}>
          <AuthHeader />
        </Flex>
        <Flex>{children}</Flex>
        <Flex>
          <AuthFooter />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default AuthLayout;
