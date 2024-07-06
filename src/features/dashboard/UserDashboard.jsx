/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { WechatOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, Flex, Image } from "antd";
import { useQuery } from "@tanstack/react-query";
import AuthFooter from "../users/components/common/Footer";
import DashboardData from "./common/DashboardData";
import Logo from "../../assets/react.svg";

const { Content, Footer, Sider } = Layout;

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

  const fetchusers = async () => {
    const res = await fetch("http://localhost:5001/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    const users = await res.json();

    return users;
  };

  const { data: users, isFetched } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchusers,
  });

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
            dataSource={isFetched ? users?.resource : []}
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
