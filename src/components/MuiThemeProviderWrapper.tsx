// components/MuiThemeProviderWrapper.tsx
"use client";

import { darkTheme, lightTheme } from "@/type/theme";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";

import { useTheme } from "next-themes";
import { useMemo, useEffect, useState } from "react";

export default function MuiThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // tránh flash khi SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useMemo(() => {
    return resolvedTheme === "dark" ? darkTheme : lightTheme;
  }, [resolvedTheme]);

  if (!mounted) return null; // Tránh flicker SSR/CSR không khớp

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
