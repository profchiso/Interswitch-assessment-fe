/* eslint-disable react/prop-types */
import { Card, Avatar } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
const { Meta } = Card;
const PostCard = ({ post }) => {
  return (
    <>
      <Card
        style={{
          width: 240,
          height: 200,
          backgroundColor: "!#698474",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Avatar>
            <UserOutlined />
          </Avatar>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingBottom: "10px",
          }}
        >
          {post.user.name.split(" ")[0]}
        </div>
        <Meta
          title={post.title}
          description={`${
            post.body.length < 20 ? post.body : post.body.slice(0, 20) + "..."
          }`}
        />

        <div
          style={{
            margin: "0.1rem 0",
            padding: "1rem 0",
            cursor: "pointer",
          }}
          title="Comment on post"
          onClick={() => console.log("Click")}
        >
          <MessageOutlined title="Comment on post" />{" "}
          {post.comments.length > 0 ? post.comments.length : "No comments"}
        </div>
      </Card>
    </>
  );
};
export default PostCard;
