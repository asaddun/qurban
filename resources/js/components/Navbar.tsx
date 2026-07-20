import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

import { Layout, Button, Dropdown, Space } from 'antd';
import { router } from '@inertiajs/react';

const { Header } = Layout;

interface Props {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}

export default function Navbar({ collapsed, setCollapsed }: Props) {
    const menu = {
        items: [
            {
                key: 'logout',
                label: 'Logout',
                icon: <LogoutOutlined />,
            },
        ],
        onClick: ({ key }: { key: string }) => {
            if (key === 'logout') {
                router.post('/logout');
            }
        },
    };

    return (
        <Header
            style={{
                background: '#fff',
            }}
            className="flex items-center justify-end"
        >
            <Dropdown menu={menu}>
                <Button
                    type="text"
                    style={{
                        fontSize: '16px',
                    }}
                >
                    <Space>Admin</Space>
                </Button>
            </Dropdown>
        </Header>
    );
}
