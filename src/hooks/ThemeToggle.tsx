"use client";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.15 }}
      className="relative w-10 h-10 flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300 ease-in-out"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isDarkMode ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-indigo-600 dark:text-yellow-300"
        >
          {isDarkMode ? <FiMoon /> : <FiSun />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
