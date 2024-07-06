/* eslint-disable react/prop-types */

import { UserOutlined } from "@ant-design/icons";
import { Avatar, theme, Popover } from "antd";

const Logout = ({ title, setIsAuthenticated }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const text = <span></span>;
  const content = (
    <div
      onClick={() => {
        sessionStorage.clear();
        setIsAuthenticated(false);
      }}
      style={{ cursor: "pointer" }}
    >
      <p>Logout</p>
    </div>
  );
  return (
    <>
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
        <div>{title}</div>
        <div>
          <Popover placement="leftBottom" title={text} content={content}>
            <Avatar size="middle" icon={<UserOutlined />} />
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Logout;
