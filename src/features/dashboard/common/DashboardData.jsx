/* eslint-disable react/prop-types */

import { Table, Input, theme } from "antd";
import Logout from "./Logout";

const DashboardContent = ({
  title,
  columns,
  dataSource,
  onChange,
  onSearch,
  setIsAuthenticated,
  searchUser,
  setFetchedUsers,
  onSearchChange,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Logout title={title} setIsAuthenticated={setIsAuthenticated} />

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
        <div style={{ padding: "10px 0" }}>
          {" "}
          <Input.Search
            placeholder="input search text"
            allowClear
            enterButton
            size="large"
            onSearch={onSearch}
            onChange={onSearchChange}
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
    </>
  );
};

export default DashboardContent;
