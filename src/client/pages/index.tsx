import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { apiAddToken, apiGetTokens } from './api/api';
import { Layout, Menu } from 'antd';
import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

const Home: NextPage = () => {

  const [tokens, setTokens] = useState<any>([]);

  useEffect(() => {
    apiGetTokens().then((response) => {
      setTokens(response);
    });
  }, [])
 
  return (
    <SiteLayout>
      <div>test</div>
    </SiteLayout>
  )
}

export default Home
