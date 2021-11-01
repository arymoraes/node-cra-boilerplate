import React, { ReactElement } from 'react';
import styles from '../../styles/Header.module.scss';
import { Menu, Button } from 'antd';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import { useRouter } from 'next/router';


export default function Header(): ReactElement {
    const router = useRouter();
    const [user, setUser] = useRecoilState(userState);

    const logout = () => {
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
            <span className={styles.greeting}>Hello, Boilimax</span>
            <span className={styles.profit}>$4,311,55</span>
            <Button type="primary" className={styles.button} onClick={logout}>Logout</Button>
        </div>
    )
}
