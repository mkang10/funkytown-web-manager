import { motion } from "framer-motion";
import { PackageCheck } from "lucide-react";

import { ImportStatus } from "@/type/enum/ImportStatus ";
import InventoryStatusCharts from "./InventoryStatusCharts";
import InventorySummaryCards from "./InventorySummaryCards";

export type ImportStatusSummary = {
  total: number;
} & Record<ImportStatus, number>;

type ChartDataItem = {
  name: string;
  value: number;
  color: string;
};

type ImportDashboardProps = {
  summary: ImportStatusSummary;
  chartData: ChartDataItem[];
};

export default function ImportDashboard({ summary, chartData }: ImportDashboardProps) {
  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-16 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-4 border-b pb-4 border-gray-200 dark:border-gray-700"
      >
        <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900">
          <PackageCheck className="w-8 h-8 text-green-600 dark:text-green-300" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Quản Lý Phiếu Nhập
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white dark:bg-black shadow-md rounded-2xl p-6"
      >
        <InventorySummaryCards summary={summary} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-black shadow-md rounded-2xl p-6"
      >
        <InventoryStatusCharts chartData={chartData} summary={summary} />
      </motion.div>
    </div>
  );
}
