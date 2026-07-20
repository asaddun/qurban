import { createInertiaApp } from '@inertiajs/react';
import AdminLayout from '@/pages/layouts/AdminLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
    resolve(name) {
        const pages = import.meta.glob('./pages/**/*.tsx', {
            eager: true,
        });

        const page = pages[`./pages/${name}.tsx`] as any;

        if (name.startsWith('admin/')) {
            page.default.layout = (page: React.ReactNode) => (
                <AdminLayout>{page}</AdminLayout>
            );
        }

        return page.default;
    },
});
