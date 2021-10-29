import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Header from '../components/header/Header';
import TokenList from '../components/lists/TokenList'
import { apiAddToken, apiGetTokens } from './api/api';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

const Home: NextPage = () => {

  const [tokens, setTokens] = useState<any>([]);
  const [contract, setContract] = useState<string>('');

  useEffect(() => {
    apiGetTokens().then((response) => {
      setTokens(response);
    });
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContract(event.target.value);
  } 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token: any = await apiAddToken(contract);
    if (token) {
      setTokens([...tokens, token]);
    } else {
      alert('Something went wrong. Try again');
    }
  }
  
  return (
      <Layout >
      <Header />
      <main>
        { tokens && <TokenList tokens={tokens}/>}
        {/* <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Contract" onChange={handleChange}/>
          <button type="submit">Add Token</button>
        </form> */}
      </main>
      <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          theme="dark"
          defaultOpenKeys={['sub1']}
          style={{ height: 'calc(94.6vh - 3vh - 64px)', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Games">
            <Menu.Item key="1">View Games</Menu.Item>
            <Menu.Item key="2">Add Game</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Tokens">
            <Menu.Item key="3">View Tokens</Menu.Item>
            <Menu.Item key="4">Add Token</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="Investments">
            <Menu.Item key="5">My investments</Menu.Item>
            <Menu.Item key="6">My profit</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Games</Breadcrumb.Item>
          <Breadcrumb.Item>View Games</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Danlimax
        </Content>
      </Layout>
    </Layout>
    <Footer style={{ textAlign: 'center', background: '#001529', color: 'white' }}>Fallenefc ©2021</Footer>
      </Layout>
  )
}

export default Home
