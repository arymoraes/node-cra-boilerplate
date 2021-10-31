import { Component, ReactElement, useEffect, useState } from 'react'
import Header from '../header/Header';
import TokenList from '../lists/TokenList'
import { apiAddToken, apiGetTokens } from '../../pages/api/api';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import React from 'react';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

export default function SiteLayout(props: any): ReactElement {
    const [tokens, setTokens] = useState<any>([]);
    const [contract, setContract] = useState<string>('');
    const [selectedPage, setSelectedPage] = useState<string>('HomePage');

    useEffect(() => {
        apiGetTokens().then((response) => {
            setTokens(response);
        });
    }, [])

    return (
        <Layout >
            <Header />
            <main>
                {tokens && <TokenList tokens={tokens} />}
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
                        style={{ height: 'calc(98.9vh - 64px)', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Games">
                            <Menu.Item key="1"><a href="/games">View Games</a></Menu.Item>
                            <Menu.Item key="2"><a href="/addGame">Add Game</a></Menu.Item>
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
                <Layout>
                    <Breadcrumb style={{ margin: '16px' }}>
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
                        {props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center', background: '#000c17', color: 'white', height: '5vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', bottom: 0, width: '100%' }}>Fallenefc, BoiDrigoW e BoiLimaX ©2021</Footer>
                </Layout>
            </Layout>
        </Layout>
    )
}
