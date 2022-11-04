import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
  const navigate = useNavigate();
  return (
    <div className="post">
      <div className="post_content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton
          style={{ margin: "5px" }}
          onClick={() => navigate(`/posts/${props.post.id}`)}
        >
          Open
        </MyButton>
        <MyButton
          style={{ margin: "5px" }}
          onClick={() => props.remove(props.post)}
        >
          Remove
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;
