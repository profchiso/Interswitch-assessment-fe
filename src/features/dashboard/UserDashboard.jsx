/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
const UserDashboard = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const { pathname } = useLocation();

  const getUsers = async () => {
    const res = await fetch("http://localhost:5001/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    const users = await res.json();
    setFetchedUsers(users.resource);
    return users.resource;
  };

  const { data: users, isFetched } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 60 * 1000,
  });
  useEffect(() => {
    getUsers();
  }, [users]);

  const searchUser = async (searchtext) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/v1/users?search=${searchtext}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      const users = await res.json();

      setFetchedUsers(users.resource);

      return users.resource;
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (value) => {
    console.log(value);
    searchUser(value);
  };

  const onSearchChange = (e) => {
    console.log(e.target.value);
    searchUser(e.target.value);
  };
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
          <DashboardData
            setIsAuthenticated={props.setIsAuthenticated}
            title={"Users"}
            columns={columns}
            dataSource={isFetched ? fetchedUsers : []}
            onChange={onChange}
            onSearch={onSearch}
            searchUser={searchUser}
            setFetchedUsers={setFetchedUsers}
            onSearchChnage={onSearchChange}
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
