import type { NextPage } from 'next';
import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import InvestmentsPage from '../components/pages/InvestmentsPage';

const Investments: NextPage = () => {

  return (
    <SiteLayout>
        <InvestmentsPage />
    </SiteLayout>
  )
}

export default Investments
