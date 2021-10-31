import React, { ReactElement } from 'react';
import styles from '../../styles/Header.module.scss';
import { Menu, Button } from 'antd';
import Link from 'next/link';


export default function Header(): ReactElement {
    return (
        <div className={styles.header}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" className={styles.navbar} defaultSelectedKeys={['2']}>
                <Menu.Item key="1"><Link href="/">Home</Link></Menu.Item>
            </Menu>
            <span className={styles.greeting}>Hello, Boilimax</span>
            <span className={styles.profit}>$4,311,55</span>
            <Button type="primary" className={styles.button}>Logout</Button>
        </div>
    )
}
