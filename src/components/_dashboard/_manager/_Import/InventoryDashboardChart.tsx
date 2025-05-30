'use client';

import { useEffect, useState } from 'react';
import { filterInventoryImports } from '@/ultis/importapi';
import { InventoryImportItem } from '@/type/InventoryImport';
import PieStatusChart from './PieStatusChart/PieStatusChart';
import BarStatusChart from './BarStatusChart';
import LineMonthChart from './LineMonthChart';

const STATUS_COLORS: Record<string, string> = {
    Pending: '#facc15',
    Approved: '#34d399',
    Rejected: '#f87171',
    Processing: '#60a5fa',
    Done: '#4ade80',
    Success: '#22c55e',
    'Partial Success': '#fbbf24',
};

export default function InventoryDashboardChart() {
    const [data, setData] = useState<InventoryImportItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await filterInventoryImports({ Page: 1, PageSize: 100 });
                setData(res.data.data);
            } catch (error) {
                console.error('Failed to fetch inventory import data:', error);
            }
        };
        fetchData();
    }, []);

    const statusCounts = Object.entries(
        data.reduce((acc, item) => {
            acc[item.status] = (acc[item.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    ).map(([status, count]) => ({ status, count }));

    const byMonth = data.reduce((acc, item) => {
        const date = new Date(item.createdDate);
        const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const monthlyData = Object.entries(byMonth)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, count]) => ({ month, count }));

    return (
        <div className="p-6 space-y-8 bg-gray-50 dark:bg-black min-h-screen">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold dark:text-white text-gray-900 mb-2">
                    🏬 Quản Lý Nhập Hàng
                </h1>
                <p className="text-lg dark:text-gray-300 text-gray-600">
                    Theo dõi hoạt động nhập kho của bạn với giao diện thân thiện, dễ hiểu.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-black rounded-2xl shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                        Phân Bố Trạng Thái
                    </h2>
                    <PieStatusChart data={statusCounts} colors={STATUS_COLORS} />
                </div>

                <div className="bg-white dark:bg-black rounded-2xl shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                        Số Lượng Theo Trạng Thái (Biểu Đồ Cột)
                    </h2>
                    <BarStatusChart data={statusCounts} colors={STATUS_COLORS} />
                </div>
            </div>

            <div className="bg-white dark:bg-black rounded-2xl shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                    Xu Hướng Nhập Kho Theo Tháng
                </h2>
                <LineMonthChart data={monthlyData} />
            </div>
        </div>
    );
}
