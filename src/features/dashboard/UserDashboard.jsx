/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { WechatOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, Flex, Image } from "antd";
import AuthFooter from "../users/components/common/Footer";
import DashboardData from "./common/DashboardData";
import Logo from "../../assets/react.svg";
const { Content, Footer, Sider } = Layout;

const dataSource = [
  {
    key: "1",
    name: "Mike",
    email: "email1@gmail.com",
    createdAt: "10/10/2024",
  },
  {
    key: "2",
    name: "Ken",
    email: "email1@gmail.com",
    createdAt: "10/10/2024",
  },
  {
    key: "3",
    name: "Ken",
    email: "email1@gmail.com",
    createdAt: "10/10/2024",
  },
  {
    key: "4",
    name: "Ken",
    email: "email1@gmail.com",
    createdAt: "10/10/2024",
  },
  {
    key: "5",
    name: "Ken",
    email: "email1@gmail.com",
    createdAt: "10/10/2024",
  },
  {
    key: "6",
    name: "Ken",
    email: "email1@gmail.com",
    createdAt: "10/10/2024",
  },
  {
    key: "7",
    name: "Ken",
    email: "email1@gmail.com",
    createdAt: "10/10/2024",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email - b.email,
  },
  {
    title: "Created Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to={"/dashboard/users"}>Users</Link>, "1", <TeamOutlined />),
  getItem(<Link to={"/dashboard/posts"}>posts</Link>, "2", <WechatOutlined />),
];
const UserDashboard = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Flex
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Image src={Logo} alt="App-Logo" width="60px" height="60px" />
        </Flex>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "16px ",
          }}
        >
          <DashboardData
            setIsAuthenticated={props.setIsAuthenticated}
            title={"Users"}
            columns={columns}
            dataSource={dataSource}
            onChange={onChange}
            onSearch={onSearch}
          />
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <AuthFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};
export default UserDashboard;
