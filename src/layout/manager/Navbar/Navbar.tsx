"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  Box,
  Typography,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiGrid,
} from "react-icons/fi";
import { motion } from "framer-motion";
import ThemeToggle from "@/hooks/ThemeToggle";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<{ fullName?: string; imagePath?: string }>({});
  const open = Boolean(anchorEl);
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={isScrolled ? 4 : 1}
      sx={{
        ml: "4px",
        mr: "8px",
        mt: "8px",
        borderRadius: "20px",
        background: isDark ? alpha("#0f0f0f", 0.9) : alpha("#ffffff", 0.85),
        backdropFilter: "blur(14px)",
        color: isDark ? "#f5f5f5" : "#2c2c2c",
        px: 2,
        py: 1.2,
        transition: "all 0.3s ease-in-out",
        boxShadow: isDark
          ? "0 0 18px rgba(255, 255, 255, 0.5), 0 0 36px rgba(255, 255, 255, 0.3)"
          : "0 0 10px rgba(0, 120, 255, 0.2), 0 0 20px rgba(0, 120, 255, 0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Title */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-black dark:text-white"
        >
          <FiGrid size={22} className="drop-shadow-sm" />
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.25rem" }}>
            Manager Dashboard
          </Typography>
        </motion.div>

        {/* Search */}
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.6,
            borderRadius: "9999px",
            boxShadow: "none",
            bgcolor: isDark ? alpha("#ffffff", 0.1) : alpha("#ffffff", 0.6),
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: isDark ? alpha("#ffffff", 0.2) : alpha("#ffffff", 0.75),
            },
            color: isDark ? "#fff" : "#000",
          }}
        >
          <FiSearch size={16} />
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: 14, color: "inherit" }}
            placeholder="Tìm kiếm..."
          />
        </Paper>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ThemeToggle />

          <IconButton>
            <Badge badgeContent={3} color="error">
              <FiBell />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMenuOpen}>
            <Avatar
              src={user.imagePath || "/assets/ava1.avif"}
              alt="User Avatar"
              sx={{ width: 38, height: 38 }}
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: 2,
                minWidth: 160,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                bgcolor: isDark ? "#1e1e1e" : "#fff",
                color: isDark ? "#f5f5f5" : "#333",
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <FiUser className="mr-2" /> Hồ sơ
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <FiSettings className="mr-2" /> Cài đặt
            </MenuItem>
            <Divider sx={{ bgcolor: isDark ? "#333" : "#ddd" }} />
            <MenuItem onClick={handleLogout}>
              <FiLogOut className="mr-2 text-red-500" /> Đăng xuất
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
