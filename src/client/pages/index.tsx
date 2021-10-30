import type { NextPage } from 'next'
import { Component, useEffect, useState } from 'react'
import Header from '../components/header/Header';
import TokenList from '../components/lists/TokenList'
import HomePage from '../components/pages/Home';
import { apiAddToken, apiGetTokens } from './api/api';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

const Home: NextPage = () => {

  const [tokens, setTokens] = useState<any>([]);
  const [contract, setContract] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<string>('HomePage');

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
    <SiteLayout>
      <div>test</div>
    </SiteLayout>
  )
}

export default Home
