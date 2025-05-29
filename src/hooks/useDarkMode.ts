import { useTheme } from "next-themes";

export default function useDarkMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return { isDarkMode, toggleDarkMode };
}
