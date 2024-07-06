/* eslint-disable react/prop-types */
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Table, Input, theme, Popover } from "antd";

const DashboardContent = ({
  title,
  columns,
  dataSource,
  onChange,
  onSearch,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const text = <span></span>;
  const content = (
    <div
      onClick={() => {
        sessionStorage.clear();
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
