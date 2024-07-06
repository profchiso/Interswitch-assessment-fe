import { TrademarkCircleOutlined } from "@ant-design/icons";

const AuthFooter = () => {
  return (
    <div>
      <TrademarkCircleOutlined /> All Right Reserved. {new Date().getFullYear()}
    </div>
  );
};

export default AuthFooter;
