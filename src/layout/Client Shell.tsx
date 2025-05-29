"use client";

import React, { useState } from "react";
import {
  FiLogOut,
  FiHome,
  FiShoppingCart,
  FiClipboard,
  FiUserCheck,
} from "react-icons/fi";
import SidebarItem from "./Sidebar/SidebarItem";
import SidebarDropdown from "./Sidebar/SidebarDropdown";
import Navbar from "./manager/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="relative min-h-screen w-full font-sans bg-white dark:bg-black transition-colors duration-300">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-20"} 
    bg-white/70 dark:bg-zinc-900/70 
    backdrop-blur-lg 
    shadow-[0_0_10px_rgba(0,120,255,0.2),_0_0_20px_rgba(0,120,255,0.1)] 
    dark:shadow-[0_0_10px_rgba(255,255,255,0.2),_0_0_20px_rgba(255,255,255,0.1)] 
    border-r border-gray-200 dark:border-zinc-700 
    flex flex-col 
    transition-all duration-300 ease-in-out`}
        >
          {/* Logo & Toggle */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-300 dark:border-zinc-700">
            <div
              className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <img
                src="/assets/logo.avif"
                alt="Funkytown Logo"
                className="h-10 w-10 rounded-xl object-cover shadow-lg"
              />
              {isSidebarOpen && (
                <span className="text-xl font-extrabold text-black dark:text-white tracking-tight drop-shadow">
                  FUNKYTOWN
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
            <SidebarItem
              icon={<FiHome size={20} />}
              label="Tổng Quan"
              isOpen={isSidebarOpen}
              route="/dashboard"
              setIsSidebarOpen={setIsSidebarOpen}
            />

            <SidebarDropdown
              id="orders"
              icon={<FiShoppingCart size={20} />}
              label="Đơn Hàng"
              isOpen={isSidebarOpen}
              subItems={[
                { label: "Phân Công Đơn Hàng", route: "/order/order-assign" },
                { label: "Xử Lý Khiếu Nại", route: "/order/return-order" },
              ]}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              setIsSidebarOpen={setIsSidebarOpen}
            />

            <SidebarDropdown
              id="inventory"
              icon={<FiClipboard size={20} />}
              label="Yêu Cầu Kho"
              isOpen={isSidebarOpen}
              subItems={[
                { label: "Nhập Kho", route: "/inventory/import" },
                { label: "Xuất Kho", route: "/inventory/dispatch" },
              ]}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              setIsSidebarOpen={setIsSidebarOpen}
            />

            <SidebarDropdown
              id="assignment"
              icon={<FiUserCheck size={20} />}
              label="Phân Công Nhân Viên"
              isOpen={isSidebarOpen}
              subItems={[
                { label: "Phân Công Nhập Kho", route: "/assign/import" },
                { label: "Phân Công Xuất Kho", route: "/assign/dispatch" },
              ]}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </nav>

          {/* Logout */}
          <div className="border-t border-gray-300 dark:border-zinc-700 px-4 py-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-3 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-500 px-3 py-2 rounded-xl transition-all duration-200 font-semibold"
            >
              <FiLogOut size={20} />
              {isSidebarOpen && <span className="text-sm">Đăng Xuất</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1 ml-2 md:ml-4">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-4">
            <div
              className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 min-h-full border border-gray-200 dark:border-zinc-700 transition-all duration-300"
              style={{
                boxShadow: isDark
                  ? "0 0 12px rgba(255, 255, 255, 0.3), 0 0 24px rgba(255, 255, 255, 0.2)" // Trắng glow
                  : "0 0 10px rgba(0, 120, 255, 0.2), 0 0 20px rgba(0, 120, 255, 0.1)",
              }}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardShell;
