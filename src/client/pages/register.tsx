import React, { ReactElement } from 'react';
import { Layout } from 'antd';
import styles from '../styles/Login.module.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { RegisterCredentialsI } from '../interfaces/User';
import { apiRegister } from './api/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Content } = Layout;

export default function Register(): ReactElement {
    const router = useRouter();

    const onFinish = async (registerCredentials: RegisterCredentialsI) => {

        if (registerCredentials.password !== registerCredentials.password) {
            alert('senha ta diferente porra');
        }

        const response = await apiRegister(registerCredentials);

        if (response) {
            alert('Beleza deu certo, agora loga porque eu nao linkei o register com o login ainda.');
            router.push('/login');
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
                            <span className={styles.login}>Register</span>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!', min: 3 }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!', min: 8, max: 16 }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Confirm Password"
                                name="confirmpassword"
                                rules={[{ required: true, message: 'Please input your password!', min: 8, max: 16 }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>Wenked is a cheater on TFT</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        <Link href="/login">Login to your account</Link>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}
