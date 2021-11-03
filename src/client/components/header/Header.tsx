import React, { ReactElement } from 'react';
import styles from '../../styles/Header.module.scss';
import { Menu, Button } from 'antd';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { investmentsTotalState, userState } from '../../recoil/atoms';
import { useRouter } from 'next/router';
import { TotalProfit } from '../elements/TotalProfit';


export default function Header(): ReactElement {
    const router = useRouter();
    const [user, setUser] = useRecoilState(userState);
    const [isDisabled, setIsDisabled] = React.useState(false);
    const totalInvestments = useRecoilValue(investmentsTotalState);

    const logout = () => {
        setIsDisabled(true);
        setUser(null);
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className={styles.header}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" className={styles.navbar} defaultSelectedKeys={['2']}>
                <Menu.Item key="1"><Link href="/">Home</Link></Menu.Item>
            </Menu>
            <span className={styles.greeting}>Hello, {user && user.username}</span>
            {totalInvestments && <TotalProfit isHeader={true} investmentsTotal={totalInvestments} />}
            <Button type="primary" className={styles.button} onClick={logout} disabled={isDisabled}>Logout</Button>
        </div>
    )
}
