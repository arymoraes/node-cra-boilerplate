import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { apiGetTokens } from './api/api';
import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';

const Home: NextPage = () => {

  const [tokens, setTokens] = useState<any>([]);

  useEffect(() => {
    apiGetTokens().then((response) => {
      setTokens(response);
    });
  }, [])
 
  return (
    <SiteLayout>
    </SiteLayout>
  )
}

export default Home
