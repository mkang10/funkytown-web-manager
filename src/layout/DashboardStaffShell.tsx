"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import Sidebar from "./staff/sidebar";
import Navbar from "./staff/navbar";

interface DashboardStaffShellProps {
  children: React.ReactNode;
}

export default function DashboardStaffShell({ children }: DashboardStaffShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-tr from-white to-neutral-100 dark:from-black dark:to-neutral-900">
      {/* Sidebar */}
     <div className="flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        handleLogout={handleLogout}
      />
      <main className="flex-1">{/* Nội dung chính */}</main>
    </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">

    <Navbar />

        <main className="flex-1 p-6 overflow-y-auto bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300">
          <motion.div
            className="rounded-3xl p-6 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black shadow-[0_0_60px_rgba(0,0,0,0.1)] dark:shadow-[0_0_80px_rgba(255,255,255,0.15)] ring-2 ring-white/30 dark:ring-white/10 transition-all duration-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>


      </div>
    </div>
  );
}
