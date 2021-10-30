import React, { ReactElement } from 'react'
import SiteLayout from '../components/layout/SiteLayout'
import About from '../components/pages/About'

interface Props {

}

export default function addGame({ }: Props): ReactElement {
    return (
        <SiteLayout>
            <About />
        </SiteLayout>
    )
}
