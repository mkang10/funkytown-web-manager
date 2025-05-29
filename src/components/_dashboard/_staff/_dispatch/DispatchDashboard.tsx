"use client";
import { useEffect, useState } from "react";
import { Sparkles, PackageSearch } from "lucide-react";
import { motion } from "framer-motion";
import { DispatchStoreDetail } from "@/type/dispatchStoreDetail";
import { filterDispatchStoreDetails } from "@/ultis/dispatch";
import DispatchSummaryCards from "./DispatchSummaryCards";
import DispatchStatusCharts from "./DispatchStatusCharts";


const STATUS_COLORS: Record<string, string> = {
  Success: "#22c55e",     // Xanh lá
  Processing: "#facc15",  // Vàng
};
function getDispatchStatusSummary(data: DispatchStoreDetail[]) {
  const summary = {
    total: 0,
    Success: 0,
    Processing: 0,
  };

  data.forEach((item) => {
    const status = item.status.trim();
    if (status === "Success" || status === "Processing") {
      summary[status]++;
    }
    summary.total++;
  });

  return summary;
}

export default function DispatchDashboard() {
  const [data, setData] = useState<DispatchStoreDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await filterDispatchStoreDetails(1, 100);
        setData(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Lỗi tải dữ liệu dispatch");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          <Sparkles className="w-12 h-12 text-gray-700 dark:text-gray-300" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600 dark:text-red-400 text-center font-semibold bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        Đã có lỗi: {error}
      </div>
    );
  }

  const summary = getDispatchStatusSummary(data);
  const chartData = [
    { name: "Thành công", value: summary.Success, color: STATUS_COLORS.Success },
    { name: "Đang xử lý", value: summary.Processing, color: STATUS_COLORS.Processing },
  ];

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-16 py-6 min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-6 border-b pb-4 border-gray-300 dark:border-gray-700"
      >
        <div
          className="p-2 rounded-xl bg-transparent border border-white/60 bg-yellow-50 dark:bg-inherit
            shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]"
        >
          <PackageSearch className="w-8 h-8 text-yellow-500 dark:text-yellow-400 " />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
          Quản Lý Phiếu Xuất
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white dark:bg-black shadow-md rounded-2xl p-6 border border-transparent
          dark:border-white/30 dark:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)]"
      >
        <DispatchSummaryCards summary={summary} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-black shadow-md rounded-2xl p-6 border border-transparent
          dark:border-white/30 dark:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)]"
      >
        <DispatchStatusCharts chartData={chartData} summary={summary} />
      </motion.div>
    </div>
  );
}
