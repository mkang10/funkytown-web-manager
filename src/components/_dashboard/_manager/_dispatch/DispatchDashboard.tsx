'use client';

import { Dispatch } from '@/type/dispatch';
import { getAllDispatches } from '@/ultis/dispatch';
import { useEffect, useState } from 'react';
import PieStatusChart from '../_Import/PieStatusChart/PieStatusChart';
import BarStatusChart from '../_Import/BarStatusChart';
import LineMonthChart from '../_Import/LineMonthChart';
import { motion } from 'framer-motion';
const STATUS_COLORS: Record<string, string> = {
  Pending: '#facc15',
  Approved: '#34d399',
  Rejected: '#f87171',
  Processing: '#60a5fa',
  Done: '#4ade80',
  Success: '#22c55e',
  'Partial Success': '#fbbf24',
};

export default function DispatchDashboard() {
  const [data, setData] = useState<Dispatch[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllDispatches(1, 100);
        setData(res.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu dispatch:', error);
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
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = Object.entries(byMonth).map(([month, count]) => ({ month, count }));

  const totalDispatches = data.length;

  return (
    <div className="p-6 space-y-12 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-black dark:via-black dark:to-black min-h-screen">
      <motion.header 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold dark:text-white text-gray-900 mb-2 tracking-tight">
          📦 Quản Lý xuất hàng
        </h1>
        <p className="text-lg dark:text-gray-300 text-gray-600">
          Cập nhật nhanh tình hình xuất hàng của  với biểu đồ thông minh và giao diện thân thiện.
        </p>
      </motion.header>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.section 
          className="bg-white dark:bg-slate-950 shadow-md rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-sm font-medium mb-1 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Tổng Số Dispatch
          </h2>
          <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{totalDispatches}</p>
        </motion.section>

        <motion.section 
          className="bg-white dark:bg-slate-950  shadow-md rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-center dark:text-gray-200 text-gray-700">
            Phân Bố Trạng Thái
          </h2>
          <PieStatusChart data={statusCounts} colors={STATUS_COLORS} />
        </motion.section>

        <motion.section 
          className="bg-white dark:bg-slate-950  shadow-md rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-center dark:text-gray-200 text-gray-700">
            Số Lượng Theo Trạng Thái
          </h2>
          <BarStatusChart data={statusCounts} colors={STATUS_COLORS} />
        </motion.section>

        <motion.section 
          className="bg-white dark:bg-black shadow-md rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 col-span-full"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-center dark:text-gray-200 text-gray-700">
            Xu Hướng Theo Tháng
          </h2>
          <LineMonthChart data={monthlyData} />
        </motion.section>
      </motion.div>
    </div>
  );
}