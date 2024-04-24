import { useState, useEffect } from "react";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import { Layout, message } from "antd";
import "./css/App.css";
import RouteConfig from "./router";
import LoginForm from "./components/LoginForm";
import { getInfo, getUserById } from "./api/user";
import { useDispatch } from "react-redux";
import { initUserInfo, changeLoginStatus } from "./redux/userSlice";
const { Header, Footer, Content } = Layout;
function App() {
  const dispatch = useDispatch();
  function loginHandle() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  useEffect(() => {
    // 恢复登录状态
    async function fetchData() {
      const result = await getInfo();
      if (result.data) {
        const { data } = await getUserById(result.data._id);
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
      } else {
        // token过期
        message.warning(result.msg);
        localStorage.removeItem("userToken");
      }
      console.log(result, "恢复登录");
    }
    if (localStorage.getItem("userToken")) {
      fetchData();
    }
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <Header className="header">
        <NavHeader loginHandle={loginHandle}></NavHeader>
      </Header>
      <Content className="content">
        <RouteConfig></RouteConfig>
      </Content>
      <Footer className="footer">
        <PageFooter></PageFooter>
      </Footer>
      <LoginForm isShow={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
