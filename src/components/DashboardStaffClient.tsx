"use client";
import { useState, useEffect, useRef } from "react";
import { Package, Sparkles, ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import { motion } from "framer-motion";
import { filterStaffInventoryImports } from "@/ultis/importapi";
import { StaffInventoryImportStoreDetailDto } from "@/type/importStaff";
import DashboardLayoutStaff from "@/layout/DashboardStaffLayout";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // import đúng modules mới nhất Swiper 10
import ImportDashboard, { ImportStatusSummary } from "./_dashboard/_staff/_import/ImportDashboard";
import { ImportStatus } from "@/type/enum/ImportStatus ";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DispatchDashboard from "./_dashboard/_staff/_dispatch/DispatchDashboard";
import AssignmentOrderDashboard from "./_dashboard/_staff/_order/AssignmentOrderDashboard ";
import { OrderInfo } from "@/type/order";

const STATUS_COLORS: Record<string, string> = {
  Success: "#4ade80",
  Processing: "#facc15",
  Shortage: "#fb923c",
  Handled: "#38bdf8",
};

function trimStatus(status: string) {
  return status.trim() as StaffInventoryImportStoreDetailDto["status"];
}

function getStatusSummary(data: StaffInventoryImportStoreDetailDto[]): ImportStatusSummary {
  const summary: ImportStatusSummary = {
    total: 0,
    [ImportStatus.Success]: 0,
    [ImportStatus.Processing]: 0,
    [ImportStatus.Shortage]: 0,
    [ImportStatus.Handled]: 0,
  };

  data.forEach((item) => {
    const status = item.status.trim() as ImportStatus;
    if (status in summary) {
      summary[status]++;
    }
    summary.total++;
  });

  return summary;
}

export default function InventoryDashboard() {
  const [data, setData] = useState<StaffInventoryImportStoreDetailDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders]   = useState<OrderInfo[]>([]);             // <-- state orders

  // Ref cho nút navigation
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await filterStaffInventoryImports({});
        setData(res.data.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen text-gray-800 dark:text-white">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          <Sparkles className="w-12 h-12 text-purple-500" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500 text-center">Đã có lỗi: {error}</div>;
  }

  const summary = getStatusSummary(data);
  const chartData = [
    { name: "Thành công", value: summary.Success, color: STATUS_COLORS.Success },
    { name: "Đang xử lý", value: summary.Processing, color: STATUS_COLORS.Processing },
    { name: "Thiếu hàng", value: summary.Shortage, color: STATUS_COLORS.Shortage },
    { name: "Đã xử lý", value: summary.Handled, color: STATUS_COLORS.Handled },
  ];

  return (
    <DashboardLayoutStaff>
      <div className="p-8 min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white font-sans relative max-w-6xl mx-auto">
       

        {/* Nút chuyển slide */}
        <button
          ref={prevRef}
          aria-label="Previous slide"
          className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          ref={nextRef}
          aria-label="Next slide"
          className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <ChevronRight size={28} />
        </button>
  <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900 px-4 py-2 rounded-lg mb-6 max-w-md"
      >
        <Package className="w-4 h-4" />
        <span>Dữ liệu thống kê dựa trên <strong>100 phiếu gần nhất</strong>.</span>
      </motion.div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current ?? undefined,
            nextEl: nextRef.current ?? undefined,
          }}
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet bg-gray-400 dark:bg-gray-600",
            bulletActiveClass:
              "swiper-pagination-bullet-active bg-black dark:bg-white",
          }} onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          style={{ paddingBottom: "3rem" }}
        >
          <SwiperSlide>
            <ImportDashboard summary={summary} chartData={chartData} />
          </SwiperSlide>
          <SwiperSlide>
            <DispatchDashboard />
          </SwiperSlide>
          <SwiperSlide>
                       <AssignmentOrderDashboard/>

          </SwiperSlide>
        </Swiper>
      </div>
    </DashboardLayoutStaff>
  );
}
