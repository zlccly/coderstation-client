import { useState } from "react";

import NavHeader from './components/NavHeader'
import PageFooter from './components/PageFooter'
import { Layout, Modal } from 'antd'
import "./css/App.css"
import RouteConfig from './router'
const { Header, Footer, Content } = Layout;
function App() {
  function loginHandle() {
    setIsModalOpen(true)

  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

export default App;
