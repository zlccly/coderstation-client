import React from "react";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * 添加问答
 */

function AddIssueBtn(props) {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);
  function clickHandle() {
    console.log("点击");
    if (isLogin) {
      navigate("/interviews");
    } else {
      message.warning("请先登录");
    }
  }
  return (
    <Button
      type="primary"
      size="large"
      style={{
        width: "100%",
        marginBottom: "30px",
      }}
      onClick={clickHandle}
    >
      我要问答
    </Button>
  );
}

export default AddIssueBtn;
