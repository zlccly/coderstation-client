import NavHeader from './components/NavHeader'
import PageFooter from './components/PageFooter'
import { Layout } from 'antd'
const { Header, Footer, Content } = Layout;
function App() {
  return (
    <div className="App">
      <Header>
        <NavHeader></NavHeader>
      </Header>
      <Content></Content>
      <Footer>
        <PageFooter></PageFooter>
      </Footer>

    </div>
  );
}

export default App;
