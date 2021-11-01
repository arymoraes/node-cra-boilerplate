import { ReactElement, useEffect, useState } from 'react'
import Header from '../header/Header';
import TokenList from '../lists/TokenList'
import { apiGetTokens } from '../../pages/api/api';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gamesState, tokensState, userState } from '../../recoil/atoms';
import { apiGetGames } from '../../pages/api/games/apiGames';
import { useRouter } from 'next/router';
import { apiGetProfile } from '../../pages/api/auth';
import LoadingSpinner from '../elements/LoadingSpinner';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

export default function SiteLayout(props: any): ReactElement {
    const router = useRouter();
    const [tokens, setTokens] = useRecoilState(tokensState);
    const [games, setGames] = useRecoilState(gamesState);
    const [user, setUser] = useRecoilState(userState);
    const [fetchedUserInfo, setFetchedUserInfo] = useState<boolean>(false);
 
    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem('token');
            if (token) {
                apiGetProfile().then((response) => {
                    if (response) {
                        setUser(response.user);
                        localStorage.setItem('token', `Bearer ${response.token}`);
                        setFetchedUserInfo(true);
                    }
                }).catch((error) => {
                    router.push('/login');
                });
            } else {
                router.push('/login');
            }
            return;
        }
        apiGetTokens().then((response) => {
            setTokens(response);
        });
        apiGetGames().then(res => {
            setGames(res);
        });
        setFetchedUserInfo(true);
    }, []);

    if (!fetchedUserInfo) {
        return (
            <LoadingSpinner />
        );
    } else {
        return (
            <Layout>
                <Header />
                <main>
                    {tokens && <TokenList tokens={tokens} />}
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
                            {user && user.role === 'admin' &&
                                <SubMenu key="sub1" icon={<UserOutlined />} title="Admin Menu">
                                    <Menu.Item key="1"><Link href="/games">View/Add Games</Link></Menu.Item>
                                    <Menu.Item key="3"><Link href="/tokens">View/Add Tokens</Link></Menu.Item>
                                </SubMenu>
                            }
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
                                marginBottom: '60px',
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
}
function charCountState(charCountState: any) {
    throw new Error('Function not implemented.');
}

