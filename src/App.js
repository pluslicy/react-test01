import React, { Component } from 'react';
import { BrowserRouter ,Route ,Link} from 'react-router-dom'

import './App.css';
import Book from './pages/Book'
import Customer from './pages/Customer'

// 组件库
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentKey:'1',
      currentBreadcrumb:'羊绒大衣'
    }
  }
  handleMenuItemSelect = (item)=>{
    switch(item.key){
      case "1":
        this.setState({
          currentBreadcrumb : "羊绒大衣"
        })
        break;
      case "2":
        this.setState({
          currentBreadcrumb : "顾客"
        })
        break;
      default:
        this.setState({
          currentBreadcrumb : "羊绒大衣"
        })
    }
  }
  render() {
    return (
      <div className='app'>
      <BrowserRouter>
      <Layout className="layout">
        <Header>
          <div className="logo" >淘淘羊绒</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.state.currentKey]}
            style={{ lineHeight: '64px' }}
            onSelect={this.handleMenuItemSelect}
          >
            <Menu.Item key="1"><Link to="/book">羊绒大衣</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/customer">顾客</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>主页</Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.currentBreadcrumb}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Route path="/book" component={Book} />
            <Route path="/customer" component={Customer} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
