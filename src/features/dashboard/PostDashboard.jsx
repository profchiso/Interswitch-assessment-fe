/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { WechatOutlined, TeamOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Flex,
  Image,
  Row,
  Col,
  App,
  Input,
  Modal,
  Button,
} from "antd";

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
    <Link to={"/dashboard/posts"}>Posts</Link>,
    "/dashboard/posts",
    <WechatOutlined />
  ),
];

const PostDashboard = (props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { pathname } = useLocation();

  const handlePost = async () => {
    const res = await fetch("http://localhost:5001/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ title, body }),
    });
    if (res.status === 429) {
      notification.error({
        message: "Posts",
        placement: "top",
        description: res.statusText,
      });
    }
    const post = await res.json();
    setIsOpen(false);
    setTitle("");
    setBody("");
    queryClient.invalidateQueries("posts");

    refetchPost();

    notification.success({
      message: "Posts",
      placement: "top",
      description: post?.data?.msg,
    });

    return post?.resource;
  };

  const fetchPosts = useCallback(async () => {
    const res = await fetch("http://localhost:5001/api/v1/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    if (res.status === 429) {
      notification.error({
        message: "Posts",
        placement: "top",
        description: res.statusText,
      });
    }
    const posts = await res.json();

    return posts?.resource;
  }, [notification]);

  const {
    data: posts,
    isFetched,
    isSuccess,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // staleTime: 3 * 1000,
  });

  const chunkedDataSource = [];
  if (isFetched) {
    for (let i = 0; i < posts?.length; i += 4) {
      chunkedDataSource.push(posts.slice(i, i + 4));
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Modal
        title={<p>Add Post</p>}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={""}
      >
        <p>
          <Input
            placeholder="Enter Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>

        <p>
          <Input
            placeholder="Enter Post Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </p>
        {title && body && (
          <p>
            <Button type="primary" onClick={handlePost}>
              Post
            </Button>
          </p>
        )}
      </Modal>
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
        <Content style={{ margin: "16px " }}>
          <Logout
            title={"Posts"}
            setIsAuthenticated={props.setIsAuthenticated}
          />
          <div style={{ paddingTop: "16px" }}>
            <PlusOutlined
              size={"large"}
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(true)}
              title="Add new post"
            />
          </div>
          {isSuccess &&
            chunkedDataSource.map((chunk, index) => (
              <Row key={index} gutter={[16, 16]} style={{ margin: "16px 0" }}>
                {chunk.map((post) => (
                  <Col key={post._id} className="gutter-row" span={6}>
                    <PostCard
                      refetchPost={refetchPost}
                      key={post._id}
                      post={post}
                    />
                  </Col>
                ))}
              </Row>
            ))}
        </Content>

        <Footer style={{ textAlign: "center" }}>
          <AuthFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PostDashboard;
