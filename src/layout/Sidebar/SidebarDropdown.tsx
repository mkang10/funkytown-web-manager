"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

interface SubItem {
  label: string;
  route: string;
}

interface SidebarDropdownProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  subItems: SubItem[];
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  setIsSidebarOpen: (open: boolean) => void;
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  id,
  icon,
  label,
  isOpen,
  subItems,
  activeDropdown,
  setActiveDropdown,
  setIsSidebarOpen,
}) => {
  const pathname = usePathname();
  const isDropdownOpen = activeDropdown === id;
  const isAnySubItemActive = subItems.some(item => pathname.startsWith(item.route));

  const handleHeaderClick = () => {
    setIsSidebarOpen(true);
    setActiveDropdown(isDropdownOpen ? null : id);
  };

  return (
    <div>
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer transition-all
          ${
            isAnySubItemActive
              ? "bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white font-semibold"
              : "text-neutral-700 dark:text-neutral-300"
          }
          hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white`}
        onClick={handleHeaderClick}
      >
        <div className="flex items-center gap-3">
          {icon}
          {isOpen && <span className="text-sm">{label}</span>}
        </div>
        {isOpen && (
          <div className="transition-transform duration-200">
            {isDropdownOpen ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </div>
        )}
      </div>

      {/* Subitems */}
      {isDropdownOpen && (
        <div className="pl-10 mt-1 space-y-1">
          {subItems.map(subItem => {
            const isActive = pathname === subItem.route;
            return (
              <Link key={subItem.route} href={subItem.route}>
                <div
                  onClick={() => setIsSidebarOpen(true)}
                  className={`text-sm px-3 py-1.5 rounded-lg cursor-pointer transition-all 
                    ${
                      isActive
                        ? "bg-neutral-300 text-black dark:bg-neutral-600 dark:text-white font-semibold"
                        : "text-neutral-600 dark:text-neutral-400"
                    }
                    hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-700 dark:hover:text-white`}
                >
                  {subItem.label}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
