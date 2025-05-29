import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  route: string;
  setIsSidebarOpen: (open: boolean) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isOpen,
  route,
  setIsSidebarOpen,
}) => {
  const pathname = usePathname();
  const isActive = pathname === route;

  const handleClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <Link href={route}>
      <div
        onClick={handleClick}
        className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all
          ${
            isActive
              ? "bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white font-semibold"
              : "text-neutral-700 dark:text-neutral-300"
          }
          hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white`}
      >
        <div
          className={`transition-transform ${isActive ? "scale-110" : "group-hover:scale-105"}`}
        >
          {icon}
        </div>
        {isOpen && <span className="text-sm">{label}</span>}
      </div>
    </Link>
  );
};

export default SidebarItem;
