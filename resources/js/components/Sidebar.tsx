import React, { useState } from 'react';
import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';
import { router } from '@inertiajs/react';

const { Sider } = Layout;

interface Props {
    collapsed: boolean;
}

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const items = [
        {
            key: '/admin/dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/admin/participants',
            icon: <UserOutlined />,
            label: 'Peserta',
        },
        {
            key: '/admin/settings',
            icon: <SettingOutlined />,
            label: 'Setting',
        },
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => {
                setCollapsed(value);
            }}
            width={250}
            trigger={<MenuFoldOutlined />}
        >
            <div className="flex h-16 items-center justify-center text-xl font-bold text-white">
                Qurban App
            </div>

            <Menu
                theme="dark"
                mode="inline"
                items={items}
                onClick={({ key }) => {
                    router.visit(key);
                }}
            />
        </Sider>
    );
}
