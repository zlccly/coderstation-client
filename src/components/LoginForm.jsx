import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Radio,
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  message,
} from "antd";
import styles from "../css/LoginForm.module.css";
import { getCaptcha, userIsExist, addUser } from "../api/user";
import { useDispatch } from "react-redux";
import { initUserInfo, changeLoginStatus } from "../redux/userSlice";

function LoginForm(props) {
  const dispatch = useDispatch();
  // 副作用
  useEffect(() => {
    captchaClickHandle();
  }, [props.isShow]);

  // 单选框（登录、注册）
  const [value, setValue] = useState(1);
  function onChange(e) {
    setValue(e.target.value);
    captchaClickHandle();
  }

  // 登录form表单完成
  function loginHandle() {}
  // 登录form表单ref
  const loginFormRef = useRef();
  // 注册form表单ref
  const registerFormRef = useRef();

  // 登录表单的状态数据
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: false,
  });

  // 注册表单的状态数据
  const [registerInfo, setRegisterInfo] = useState({
    loginId: "",
    nickname: "",
    captcha: "",
  });
  // 图形验证码
  const [captcha, setCaptcha] = useState(null);
  /**
   *
   * @param {*} oldInfo 之前整体的状态
   * @param {*} newContent 用户输入的新的内容
   * @param {*} key 对应的键名
   * @param {*} setInfo 修改状态值的函数
   */
  function updateInfo(oldInfo, newContent, key, setInfo) {
    const obj = { ...oldInfo };
    obj[key] = newContent;
    setInfo(obj);
  }
  // 刷新图形验证码
  async function captchaClickHandle() {
    const result = await getCaptcha();
    setCaptcha(result);
  }

  // 验证用户是否已经存在
  async function checkLoginIdIsExist() {
    if (registerInfo.loginId) {
      const { data } = await userIsExist(registerInfo.loginId);
      if (data) {
        return Promise.reject("该用户已经注册过了");
      }
      console.log(data, "用户是否存在");
    }
  }
  // 关闭登录注册弹框
  function handleCancel() {
    // 清空上次内容
    setRegisterInfo({
      loginId: "",
      nickname: "",
      captcha: "",
    });
    setLoginInfo({
      loginId: "",
      loginPwd: "",
      captcha: "",
      remember: false,
    });
    props.closeModal();
  }
  // 注册完成(rom表单)
  async function registerHandle() {
    const result = await addUser(registerInfo);
    if (result.data) {
      message.success("用户注册成功，默认密码为123456");
      // 还需将用户的信息存储到数据仓库中
      dispatch(initUserInfo(result.data));
      dispatch(changeLoginStatus(true));
      handleCancel()
    } else {
      message.warning(result.msg);
      captchaClickHandle();
    }
    console.log(result);
  }
  // 注册/登录jsx
  let container = null;

  // 模态框确定按钮
  const handleOk = () => {};
  if (value === 1) {
    container = (
      <div className={styles.container}>
        <Form
          name="basic1"
          autoComplete="off"
          onFinish={loginHandle}
          ref={loginFormRef}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
          >
            <Input
              placeholder="请输入你的登录账号"
              value={loginInfo.loginId}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginId", setLoginInfo)
              }
            />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password
              placeholder="请输入你的登录密码，新用户默认为123456"
              value={loginInfo.loginPwd}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginPwd", setLoginInfo)
              }
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="logincaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      loginInfo,
                      e.target.value,
                      "captcha",
                      setLoginInfo
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="remember"
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Checkbox
              onChange={(e) =>
                updateInfo(
                  loginInfo,
                  e.target.checked,
                  "remember",
                  setLoginInfo
                )
              }
              checked={loginInfo.remember}
            >
              记住我
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              登录
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    // 注册面板的 JSX
    container = (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={registerHandle}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号，仅此项为必填项",
              },
              // 验证用户是否已经存在
              { validator: checkLoginIdIsExist },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "loginId",
                  setRegisterInfo
                )
              }
            />
          </Form.Item>

          <Form.Item label="用户昵称" name="nickname">
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickname}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "nickname",
                  setRegisterInfo
                )
              }
            />
          </Form.Item>

          <Form.Item
            name="registercaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      registerInfo,
                      e.target.value,
                      "captcha",
                      setRegisterInfo
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  return (
    <div>
      <Modal
        title="Basic Modal"
        open={props.isShow}
        onOk={handleOk}
        onCancel={props.closeModal}
      >
        <Radio.Group
          buttonStyle="solid"
          value={value}
          onChange={onChange}
          className={styles.radioGroup}
        >
          <Radio.Button value={1} className={styles.radioButton}>
            登录
          </Radio.Button>
          <Radio.Button value={2} className={styles.radioButton}>
            注册
          </Radio.Button>
        </Radio.Group>
        {container}
      </Modal>
    </div>
  );
}

export default LoginForm;
