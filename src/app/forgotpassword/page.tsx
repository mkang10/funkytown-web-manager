"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Giả lập API gửi email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Reset link đã được gửi tới email của bạn!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ece9e6, #ffffff)",
        position: "relative",
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          position: "relative",
          zIndex: 1,
          p: 5,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo nổi bật ở giữa */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Image src="/assets/logo.avif" alt="Logo" width={90} height={90} style={{ borderRadius: "50%" }} />
        </Box>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          Forgot Password
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <FaEnvelope style={{ marginRight: "10px", color: "gray" }} />
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "black",
              "&:hover": { backgroundColor: "gray" },
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Send Reset Link
          </Button>
        </form>

        <Button
          variant="text"
          startIcon={<FaArrowLeft />}
          sx={{
            mt: 2,
            fontSize: "0.85rem",
            textTransform: "none",
            color: "#1976d2",
            "&:hover": {
              textDecoration: "underline",
              backgroundColor: "transparent",
            },
          }}
          onClick={() => router.push("/")}
        >
          Quay lại đăng nhập
        </Button>
      </Paper>

      <ToastContainer />
    </Box>
  );
}
