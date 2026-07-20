import { Layout, theme } from 'antd';
import { PropsWithChildren, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const { Content } = Layout;

export default function AdminLayout({ children }: PropsWithChildren) {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />

            <Layout>
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

                <Content
                    className="m-4 rounded-lg p-4"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
