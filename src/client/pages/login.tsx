import React, { ReactElement } from 'react';
import { Layout } from 'antd';
import styles from '../styles/Login.module.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { LoginCredentialsI } from '../interfaces/User';
import { apiLogin } from './api/auth';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms';
import { useRouter } from 'next/router';

const { Content } = Layout;

export default function Login(): ReactElement {
    const router = useRouter();
    const [user, setUser] = useRecoilState(userState);

    const onFinish = async (loginCredentials: LoginCredentialsI) => {
        const response = await apiLogin(loginCredentials);
        if (response) {
            localStorage.setItem('token', `Bearer ${response.token}`);
            setUser(response.user);
            router.push('/');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Layout>
                <Content className={styles.wrapper} style={{ height: '100vh' }}>
                    <div className={styles.container}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <span className={styles.login}>Login</span>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}
