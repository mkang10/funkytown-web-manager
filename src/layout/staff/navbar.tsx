"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiBell, FiSearch } from "react-icons/fi";
import ThemeToggle from "@/hooks/ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ fullName: string; imagePath?: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const accountData = localStorage.getItem("account");
    if (accountData) {
      const parsed = JSON.parse(accountData);
      setUser({
        fullName: parsed.fullName,
        imagePath: parsed.imagePath,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <header className="m-4 rounded-2xl px-6 py-4 flex items-center justify-between border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_80px_rgba(255,255,255,0.1)] ring-2 ring-white/30 dark:ring-white/10 transition-all duration-500">
      <div className="relative w-full max-w-sm">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-lg" />
        <input
          type="text"
          placeholder="Tìm kiếm nhanh..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm"
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group">
          <FiBell className="text-2xl text-neutral-500 dark:text-neutral-300 group-hover:text-indigo-600 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">3</span>
          <div className="absolute top-8 right-0 bg-white dark:bg-neutral-900 shadow-xl text-xs px-3 py-2 rounded-md hidden group-hover:block z-20">
            Bạn có 3 thông báo mới
          </div>
        </div>

        <div className="relative">
          <div
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src={user?.imagePath || "/assets/ava1.avif"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-500 shadow-md"
            />
            <span className="hidden md:block text-neutral-700 dark:text-neutral-200 font-semibold text-sm">
              Xin chào, {user?.fullName || "Staff"}
            </span>
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-3 bg-white dark:bg-neutral-900 shadow-lg rounded-xl w-44 p-2 z-30">
              <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md">
                Hồ sơ
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
