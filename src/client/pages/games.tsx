import React, { ReactElement } from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import ViewGames from '../components/pages/ViewGames';

export default function Games(): ReactElement {
    return (
        <SiteLayout>
            <ViewGames />
        </SiteLayout>
    )
}
