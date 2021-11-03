import { ReactElement, useEffect, useState } from 'react'
import Header from '../header/Header';
import TokenList from '../lists/TokenList'
import { apiGetTokens } from '../../pages/api/api';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { gamesState, investmentsState, investmentsTotalState, tokensState, userState } from '../../recoil/atoms';
import { apiGetGames } from '../../pages/api/games/apiGames';
import { useRouter } from 'next/router';
import { apiGetProfile } from '../../pages/api/auth';
import LoadingSpinner from '../elements/LoadingSpinner';
import { apiGetInvestments } from '../../pages/api/investments/apiInvestment';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

export default function SiteLayout(props: any): ReactElement {
    
    const router = useRouter();
    const [tokens, setTokens] = useRecoilState(tokensState);
    const [games, setGames] = useRecoilState(gamesState);
    const [user, setUser] = useRecoilState(userState);
    const [fetchedUserInfo, setFetchedUserInfo] = useState<boolean>(false);
    const [investments, setInvestments] = useRecoilState<any>(investmentsState);
    const [investmentsTotal, setInvestmentsTotal] = useRecoilState<any>(investmentsTotalState);
 
    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem('token');
            if (token) {
                apiGetProfile().then((response) => {
                    if (response) {
                        setUser(response.user);
                        localStorage.setItem('token', `Bearer ${response.token}`);
                    }
                }).catch((error) => {
                    router.push('/login');
                });
            } else {
                router.push('/login');
            }
            setFetchedUserInfo(true);
        }
        apiGetTokens().then((response) => {
            setTokens(response);
        });
        apiGetGames().then(res => {
            setGames(res);
        });
        apiGetInvestments().then(res => {
            setInvestments(res.investments);
            setInvestmentsTotal(res.totalInvestments);
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
                                    <Menu.Item key="2"><Link href="/tokens">View/Add Tokens</Link></Menu.Item>
                                </SubMenu>
                            }
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Investments">
                                <Menu.Item key="3"><Link href="/investments">My investments</Link></Menu.Item>
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

function setInvestments(investments: any) {
    throw new Error('Function not implemented.');
}

function setInvestmentsTotal(totalInvestments: any) {
    throw new Error('Function not implemented.');
}

