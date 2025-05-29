'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  FiHome,
  FiClipboard,
  FiShoppingCart,
  FiTruck,
  FiRotateCcw,
  FiPackage,
  FiArchive,
  FiLogOut,
} from 'react-icons/fi';
import SidebarItem from '@/layout/Sidebar/SidebarItem';
import SidebarDropdown from '@/layout/Sidebar/SidebarDropdown';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  handleLogout: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  activeDropdown,
  setActiveDropdown,
  handleLogout,
}: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 260 : 80 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-black shadow-2xl z-20 flex flex-col border-r border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <img
            src="/assets/logo.avif"
            alt="Funkytown Logo"
            className="h-10 w-10 rounded-2xl object-cover shadow-md"
          />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                className="ml-2 text-2xl font-black text-black dark:text-white"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                FUNKYTOWN
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <SidebarItem icon={<FiHome />} label="Trang Chủ" isOpen={isSidebarOpen} route="/staff-dashboard" setIsSidebarOpen={setIsSidebarOpen} />
        <SidebarDropdown id="warehouses" icon={<FiClipboard />} label="Kho Hàng" isOpen={isSidebarOpen} subItems={[
          { label: "Nhập Kho", route: "/staff-import-requests" },
          { label: "Xuất Kho", route: "/staff-dispatch-request" }
        ]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} setIsSidebarOpen={setIsSidebarOpen} />
        <SidebarDropdown id="orders" icon={<FiShoppingCart />} label="Đơn Hàng" isOpen={isSidebarOpen} subItems={[
          { label: "Xác Nhận Đơn", route: "/order/order-confirm" }
        ]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} setIsSidebarOpen={setIsSidebarOpen} />
        {/* <SidebarDropdown id="delivery" icon={<FiTruck />} label="Giao Hàng" isOpen={isSidebarOpen} subItems={[
          { label: "Theo Dõi", route: "/staff/delivery" }
        ]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} setIsSidebarOpen={setIsSidebarOpen} />
        <SidebarDropdown id="returns" icon={<FiRotateCcw />} label="Hoàn Trả" isOpen={isSidebarOpen} subItems={[
          { label: "Yêu Cầu", route: "/staff/returns/requests" },
          { label: "Xử Lý", route: "/staff/returns/process" }
        ]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} setIsSidebarOpen={setIsSidebarOpen} />
        <SidebarDropdown id="inventory" icon={<FiPackage />} label="Tồn Kho" isOpen={isSidebarOpen} subItems={[
          { label: "Kiểm Kê Tồn Kho", route: "/staff/inventory" }
        ]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} setIsSidebarOpen={setIsSidebarOpen} />
        <SidebarDropdown id="stock" icon={<FiArchive />} label="Tình Trạng Hàng" isOpen={isSidebarOpen} subItems={[
          { label: "Tồn Hàng", route: "/staff/stock-status" }
        ]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} setIsSidebarOpen={setIsSidebarOpen} /> */}
      </nav>

    
    </motion.aside>
  );
}
