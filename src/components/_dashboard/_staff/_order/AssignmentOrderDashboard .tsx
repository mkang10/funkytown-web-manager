import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, LucideClipboardList, LucidePackageSearch, PackageSearch, SlidersHorizontal } from "lucide-react";

import SummaryCards from "./SummaryCards";
import StatusPieChart from "./StatusPieChart";
import OrderValueByStatusBarChart from "./OrderValueByStatusBarChart";
import OrderTrendChart from "./OrderTrendChart";
import RecentOrderTable from "./RecentOrderTable";
import { AssignmentOrderFilters, AssignmentOrderResponse } from "@/type/order";
import { getAssignmentStaffOrders } from "@/ultis/OrderAPI";
import AdvancedFilterPanel from "./AdvancedFilterPanel ";

export default function OrderDashboard() {
    const [orders, setOrders] = useState<AssignmentOrderResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState<AssignmentOrderFilters>({
        page: 1,
        pageSize: 50,
    });

    const fetchOrders = async (filters: AssignmentOrderFilters) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getAssignmentStaffOrders(filters);
            setOrders(res.data);
        } catch (err) {
            setError("Lỗi khi tải dữ liệu đơn hàng.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(filters);
    }, [filters]);

    return (
        <div className="space-y-10 p-6 md:p-10 bg-gray-100 dark:bg-black min-h-screen">
            {/* Filter Toggle Button */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-6 border-b pb-4 border-gray-300 dark:border-gray-700"
            >
                <div
                    className="p-2 rounded-xl bg-transparent border border-white/60 bg-blue-200 dark:bg-inherit
            shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]"
                >
                    <LucideClipboardList className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
                    Quản Lý Đơn Hàng
                </h1>
            </motion.div>
            <div className="flex justify-end">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95 text-sm font-medium text-gray-800 dark:text-gray-100"
                >
                    <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform duration-200" />
                    <span>Bộ lọc nâng cao</span>
                </button>
            </div>
            {/* Animated Filter Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AdvancedFilterPanel filters={filters} onFilter={setFilters} />
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="text-red-600 font-semibold mb-4">{error}</div>
            )}

            {loading ? (
                <div className="text-center text-gray-700 dark:text-gray-300">
                    Đang tải dữ liệu...
                </div>
            ) : (
                <>
                    <SummaryCards orders={orders} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        <StatusPieChart
                            orders={orders.map((o) => ({ status: o.order.status }))}
                        />
                        <OrderValueByStatusBarChart orders={orders} />
                    </div>

                    <div className="mt-10">
                        <OrderTrendChart orders={orders} groupBy="day" />
                    </div>

                    <div className="mt-10">
                        <RecentOrderTable orders={orders} />
                    </div>
                </>
            )}
        </div>
    );
}
