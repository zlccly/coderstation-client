import React from "react";
import { useSelector } from "react-redux";
import { Button, List, Popover, Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { clearUserInfo, changeLoginStatus } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import styles from "../css/LoginAvatar.module.css";

function LoginAvatar(props) {
  const dispacth = useDispatch();
  const navigate = useNavigate()
  function listClickHandle(item) {
    if (item === "退出登录") {
      localStorage.removeItem("userToken");
      dispacth(clearUserInfo());
      dispacth(changeLoginStatus(false));
      navigate("/")

    }
  }
  const { isLogin, userInfo } = useSelector((state) => state.user);
  let loginStatus = null;
  if (isLogin) {
    const content = (
      <List
        size="large"
        dataSource={["个人中心", "退出登录"]}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              listClickHandle(item);
            }}
          >
            {item}
          </List.Item>
        )}
      ></List>
    );
    loginStatus = (
      <Popover content={content} placement="bottom">
        <div className={styles.avatarContainer}>
          <Avatar
            src={<Image preview={false} src={userInfo?.avatar}></Image>}
            size="large"
            icon={<UserOutlined />}
          />
        </div>
      </Popover>
    );
  } else {
    loginStatus = (
      <Button type="primary" size="large" onClick={props.loginHandle}>
        注册/登录
      </Button>
    );
  }

  return <div>{loginStatus}</div>;
}

export default LoginAvatar;
