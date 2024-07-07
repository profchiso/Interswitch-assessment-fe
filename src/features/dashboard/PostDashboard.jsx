/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { WechatOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, Flex, Image, Row, Col } from "antd";
import AuthFooter from "../users/components/common/Footer";
import PostCard from "./PostCard";
import Logout from "./common/Logout";
import Logo from "../../assets/react.svg";

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <Link to={"/dashboard/users"}>Users</Link>,
    "/dashboard/users",
    <TeamOutlined />
  ),
  getItem(
    <Link to={"/dashboard/posts"}>posts</Link>,
    "/dashboard/posts",
    <WechatOutlined />
  ),
];
const PostDashboard = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = useLocation();

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:5001/api/v1/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    const posts = await res.json();

    console.log(posts);

    return posts?.resource;
  };

  const {
    data: posts,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60 * 1000,
  });
  const chunkedDataSource = [];
  if (isFetched) {
    for (let i = 0; i < posts?.length; i += 4) {
      chunkedDataSource.push(posts.slice(i, i + 4));
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [posts]);
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
          defaultSelectedKeys={[`${pathname}`]}
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
          <Logout
            title={"Posts"}
            setIsAuthenticated={props.setIsAuthenticated}
          />

          {isSuccess &&
            chunkedDataSource.map((chunk, index) => (
              <Row key={index} gutter={[16, 16]} style={{ margin: "16px 0" }}>
                {chunk.map((post) => (
                  <Col key={post._id} className="gutter-row" span={6}>
                    <PostCard key={post._id} post={post} />
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
export default PostDashboard;
