/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  getItem(<Link to={"/dashboard/users"}>Users</Link>, "1", <TeamOutlined />),
  getItem(<Link to={"/dashboard/posts"}>posts</Link>, "2", <WechatOutlined />),
];
const PostDashboard = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:5001/api/v1/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    const posts = await res.json();

    return posts;
  };

  const { data: posts, isFetched } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  console.log(posts);
  const chunkedDataSource = [];
  if (isFetched) {
    for (let i = 0; i < posts.resource.length; i += 4) {
      chunkedDataSource.push(posts.resource.slice(i, i + 4));
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
          <Logout
            title={"Posts"}
            setIsAuthenticated={props.setIsAuthenticated}
          />

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
export default PostDashboard;
