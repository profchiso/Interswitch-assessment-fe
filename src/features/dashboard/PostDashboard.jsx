import { useState } from "react";
import { Link } from "react-router-dom";
import { WechatOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Flex, Image, Row, Col, Avatar, theme } from "antd";
import AuthFooter from "../users/components/common/Footer";
import PostCard from "./PostCard";
import Logo from "../../assets/react.svg";
const { Content, Footer, Sider } = Layout;

const dataSource = [
  {
    key: "1",
    title: "first post",
    body: "First post body",
    user: { name: "Ken ben", email: "Ken" },
    comments: [],
    createdAt: "10/10/2024",
  },

  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Chinedu okorie", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body mammammmamm ammamamm",
    user: { name: "Mary Jane", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
  },
  {
    key: "1",
    title: "2nd post",
    body: "2nd post body",
    user: { name: "Ken", email: "Ken" },
    comments: [
      { body: "comment2" },
      { body: "comment1" },
      { body: "comment3" },
    ],
    createdAt: "10/10/2024",
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
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const chunkedDataSource = [];
  for (let i = 0; i < dataSource.length; i += 4) {
    chunkedDataSource.push(dataSource.slice(i, i + 4));
  }
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
            <div>Posts</div>
            <div>
              <Avatar size="middle" icon={<UserOutlined />} />
            </div>
          </div>

          {chunkedDataSource.map((chunk, index) => (
            <Row key={index} gutter={[16, 16]} style={{ margin: "16px 0" }}>
              {chunk.map((post) => (
                <Col key={post.key} className="gutter-row" span={6}>
                  <PostCard key={post.key} post={post} />
                </Col>
              ))}
            </Row>
          ))}
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
