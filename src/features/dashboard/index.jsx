import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageOutlined,
  WechatOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, Flex, Image, Table, Input } from "antd";
import AuthFooter from "../users/components/common/Footer";
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
  getItem(
    <Link to={"/dashboard/comments"}>Comments</Link>,
    "3",
    <MessageOutlined />
  ),
];
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
          <div
            style={{
              padding: 24,
              marginRight: 10,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Users</div>
            <div>
              <Avatar size="middle" icon={<UserOutlined />} />
            </div>
          </div>

          <div
            style={{
              padding: 16,
              marginTop: 10,
              marginRight: 10,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: "100%",
              overflowY: "scroll",
            }}
          >
            {/* <div style={{ padding: "10px 0" }}>Users</div> */}
            <div style={{ padding: "10px 0" }}>
              {" "}
              <Input.Search
                placeholder="input search text"
                allowClear
                enterButton
                size="large"
                onSearch={onSearch}
              />
            </div>
            <div>
              <Table
                onChange={onChange}
                dataSource={dataSource}
                columns={columns}
                showSorterTooltip={{
                  target: "sorter-icon",
                }}
              />
            </div>
          </div>
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
export default Dashboard;
