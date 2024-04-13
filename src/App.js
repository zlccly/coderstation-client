import { useState } from "react";
import NavHeader from './components/NavHeader'
import PageFooter from './components/PageFooter'
import { Layout } from 'antd'
import "./css/App.css"
import RouteConfig from './router'
import LoginForm from "./components/LoginForm";
const { Header, Footer, Content } = Layout;
function App() {
  function loginHandle() {
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)

  }
  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
    <div className="App">
      <Header className='header'>
        <NavHeader loginHandle={loginHandle}></NavHeader>
      </Header>
      <Content className='content'>
        <RouteConfig></RouteConfig>
      </Content>
      <Footer className='footer'>
        <PageFooter></PageFooter>
      </Footer>
      <LoginForm isShow={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
