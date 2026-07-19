import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { router, usePage } from '@inertiajs/react';
import login from '@/routes/login';
import { home } from '@/routes';

const { Title } = Typography;

interface LoginPageProps {
    initialError?: string;
}

export default function LoginPage(props: LoginPageProps) {
    const [form] = Form.useForm();
    const { user } = usePage().props;

    if (user) {
        router.get(home()); // Redirect to the home route
        return null;
    }

    const onFinish = (values: any) => {
        router.post(login.post(), values, {
            onSuccess: () => {
                message.success('Login successful!');
            },
            onError: (errors: any) => {
                message.error(errors.login);
            },
        });
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '50px auto',
                padding: '20px',
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
            }}
        >
            <Title
                level={2}
                style={{ textAlign: 'center', marginBottom: '20px' }}
            >
                Login
            </Title>

            {props.initialError && (
                <div
                    style={{
                        color: 'red',
                        marginBottom: '15px',
                        textAlign: 'center',
                    }}
                >
                    {props.initialError}
                </div>
            )}

            <Form
                form={form}
                onFinish={onFinish}
                initialValues={{ username: '', password: '' }}
                labelCol={{ span: 100 }}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input placeholder="Enter username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{ width: '100%' }}
                    >
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
