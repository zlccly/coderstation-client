import NavHeader from './components/NavHeader'
import PageFooter from './components/PageFooter'
import { Layout } from 'antd'
import "./css/App.css"
const { Header, Footer, Content } = Layout;
function App() {
  return (
    <div className="App">
      <Header className='header'>
        <NavHeader></NavHeader>
      </Header>
      <Content className='content'></Content>
      <Footer className='footer'>
        <PageFooter></PageFooter>
      </Footer>

    </div>
  );
}

export default App;
