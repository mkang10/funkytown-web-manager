import { motion } from "framer-motion";
import { Package, CheckCircle, RefreshCcw, Hammer } from "lucide-react";

function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function InventorySummaryCards({ summary }: { summary: any }) {
  const items = [
    {
      label: "Tổng đơn",
      value: summary.total,
      icon: Package,
      color: "from-gray-700 to-gray-900",
    },
    {
      label: "Thành công",
      value: summary.Success,
      icon: CheckCircle,
      color: "from-green-500 to-green-700",
    },
    {
      label: "Đang xử lý",
      value: summary.Processing,
      icon: RefreshCcw,
      color: "from-yellow-500 to-yellow-700",
    },
    {
      label: "Thiếu hàng",
      value: summary.Shortage,
      icon: Hammer,
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={false}
          animate={{ boxShadow: "0 0 8px 2px rgba(255,255,255,0.2)" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px 8px rgba(255,255,255,0.7)",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`bg-gradient-to-br ${item.color} p-6 rounded-3xl shadow-2xl flex items-center space-x-5 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg">
            <item.icon className="w-10 h-10 text-gray-800 dark:text-gray-200" />
          </div>
          <div>
            <p className="text-sm text-white/70 uppercase tracking-wide">
              {item.label}
            </p>
            <h2 className="text-4xl font-bold text-white">
              {formatNumber(item.value)}
            </h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
