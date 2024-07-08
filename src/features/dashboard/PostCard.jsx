/* eslint-disable react/prop-types */

import { Card, Avatar, App, Modal, Button, Input } from "antd";
import {
  MessageOutlined,
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const { Meta } = Card;
const PostCard = ({ post, refetchPost }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState({});
  const [open, setOpen] = useState(false);
  const [isOpenUdate, setIsOpenUdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [loadingUpdate, setLoadingUpdate] = useState(true);
  const [comment, setComment] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const showLoading = (post) => {
    setSelectedPost(post);
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const showLoadingUpdate = (post) => {
    setSelectedPost(post);
    setIsOpenUdate(true);
    setLoadingUpdate(true);
    setPostTitle(post.title);
    setPostBody(post.body);

    setTimeout(() => {
      setLoadingUpdate(false);
    }, 2000);
  };

  const deleteMutation = useMutation({
    mutationFn: (post) => {
      return handleDelete(post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      refetchPost();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleDelete = async (post) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/v1/posts/${post._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      const posts = await res.json();

      if (posts.responseText === "FAIL") {
        notification.error({
          message: "Delete Post",
          placement: "top",
          description: posts.errors[0].msg,
        });
        return;
      }

      queryClient.invalidateQueries("posts");
      refetchPost();

      notification.error({
        message: "Delete Post",
        placement: "top",
        description: posts.data.msg,
      });

      return posts;
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = async () => {
    const res = await fetch(`http://localhost:5001/api/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ post: selectedPost._id, body: comment }),
    });
    const postedComment = await res.json();

    setComment("");
    setOpen(false);
    queryClient.invalidateQueries("posts");
    refetchPost();
    notification.success({
      message: "Comment",
      placement: "top",
      description: postedComment.data.msg,
    });
  };
  const handleEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/v1/posts/${selectedPost._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ title: postTitle, body: postBody }),
        }
      );
      const postEdit = await res.json();

      if (postEdit.responseText === "FAIL") {
        notification.error({
          message: "Edit Post",
          placement: "top",
          description: postEdit.errors[0].msg,
        });
        return;
      }

      queryClient.invalidateQueries("posts");
      refetchPost();

      setIsOpenUdate(false);

      notification.success({
        message: "Edit Post",
        placement: "top",
        description: postEdit.data.msg,
      });

      return postEdit;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        title={<p>{selectedPost.title}</p>}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
        footer={""}
      >
        <p>{selectedPost.body}</p>
        <p>
          <Input
            placeholder="type your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </p>
        {comment && (
          <p>
            <Button type="primary" onClick={handleComment}>
              Post
            </Button>
          </p>
        )}
      </Modal>

      <Modal
        title={<p>Update Post</p>}
        loading={loadingUpdate}
        open={isOpenUdate}
        onCancel={() => setIsOpenUdate(false)}
        footer={""}
      >
        <p>
          <Input
            placeholder="type your comment"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </p>
        <p>
          <Input
            placeholder="type your comment"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
        </p>
        {postTitle && (
          <p>
            <Button type="primary" onClick={handleEdit}>
              Update
            </Button>
          </p>
        )}
      </Modal>

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
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
          onClick={() => showLoadingUpdate(post)}
        >
          <EditOutlined title="Edit" />
        </div>
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
            display: "flex",
            justifyContent: "space-between",
            margin: "0.1rem 0",
          }}
        >
          <div
            style={{
              margin: "0.1rem 0",
              padding: "1rem 0",
              cursor: "pointer",
            }}
            title="Comment on post"
            onClick={() => showLoading(post)}
          >
            <MessageOutlined title="Comment" />{" "}
            {post.comments.length > 0 ? post.comments.length : "No comments"}
          </div>
          <div
            style={{
              margin: "0.1rem 0",
              padding: "1rem 0",
              cursor: "pointer",
            }}
            title="Delete"
            onClick={() => deleteMutation.mutate(post)}
          >
            <DeleteOutlined title="Delete" />
          </div>
        </div>
      </Card>
    </>
  );
};
export default PostCard;
