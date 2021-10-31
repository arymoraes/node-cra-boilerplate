import React, { ReactElement } from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import ViewTokens from '../components/pages/ViewTokens';

export default function Tokens(): ReactElement {
    return (
        <SiteLayout>
            <ViewTokens />
        </SiteLayout>
    )
}
