"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "@/ultis/AuthAPI";
import { LoginResponse } from "@/type/auth";
import useDarkMode from "@/hooks/useDarkMode";
import ThemeToggle from "@/hooks/ThemeToggle";

import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import { FaUser, FaLock, FaUnlock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Login() {
  const { isDarkMode } = useDarkMode(); // Custom hook để kiểm tra và toggle theme
  const theme = useTheme(); // MUI theme
  const isDark = theme.palette.mode === "dark"; // Kiểm tra từ MUI theme

  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      const response: LoginResponse = await loginUser({ email, password });
      if (response.status) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("account", JSON.stringify(response.data.account));
        toast.success("Đăng nhập thành công!");

        setTimeout(() => {
          const { roleId } = response.data.account;
          router.push(roleId === 2 ? "/dashboard" : roleId === 3 ? "/staff-dashboard" : "/");
        }, 1500);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Lỗi hệ thống. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // Màu sắc theo theme
  const backgroundColor = isDark ? "#0f0f0f" : "#f4f4f4";
  const paperColor = isDark ? "#1e1e1e" : "#fff";
  const inputBg = isDark ? "#2a2a2a" : "#f0f0f0";
  const textColor = isDark ? "#fff" : "#000";
  const labelColor = isDark ? "#aaa" : "#555";
  const buttonBg = isDark ? "#fff" : "#000";
  const buttonColor = isDark ? "#000" : "#fff";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        position: "relative",
      }}
    >
      {/* Toggle theme ở góc trên */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <ThemeToggle />
      </Box>

      <Paper
        elevation={0}
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 420,
          backgroundColor: paperColor,
          borderRadius: 4,
          border: isDark ? "1px solid #333" : "1px solid #ccc",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 90,
            height: 90,
            mx: "auto",
            mb: 3,
            borderRadius: "50%",
            overflow: "hidden",
            border: `2px solid ${isDark ? "#444" : "#ddd"}`,
          }}
        >
          <Image src="/assets/logo.avif" alt="Logo" width={90} height={90} />
        </Box>

        <Typography variant="h6" sx={{ color: textColor, mb: 2 }}>
          Đăng nhập hệ thống
        </Typography>

        <form onSubmit={handleLogin} noValidate>
          <TextField
            fullWidth
            label="Email"
            inputRef={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser color="#888" />
                </InputAdornment>
              ),
              disableUnderline: true,
              sx: {
                borderRadius: 2,
                backgroundColor: inputBg,
                input: { color: textColor },
              },
            }}
            InputLabelProps={{ style: { color: labelColor } }}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock color="#888" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? "🙈" : "👁️"}
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true,
              sx: {
                borderRadius: 2,
                backgroundColor: inputBg,
                input: { color: textColor },
              },
            }}
            InputLabelProps={{ style: { color: labelColor } }}
          />

          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Button
              href="/forgotpassword"
              startIcon={<FaUnlock />}
              sx={{
                textTransform: "none",
                color: labelColor,
                fontSize: "0.85rem",
                "&:hover": { textDecoration: "underline", color: textColor },
              }}
            >
              Quên mật khẩu?
            </Button>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: buttonBg,
              color: buttonColor,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: buttonColor,
                color: buttonBg,
                border: "1px solid",
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: buttonColor }} /> : "Đăng nhập"}
          </Button>
        </form>
      </Paper>

      <ToastContainer />
    </Box>
  );
}
