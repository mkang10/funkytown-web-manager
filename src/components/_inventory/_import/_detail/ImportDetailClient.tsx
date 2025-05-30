"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  useTheme,
} from "@mui/material";
import { getImportDetail } from "@/ultis/importapi";
import { ImportDetailResponse, InventoryImportItem } from "@/type/importdetail";
import ImportDetailBasic from "@/components/_inventory/_import/_detail/ImportDetailBasic";
import ImportDetailDetails from "@/components/_inventory/_import/_detail/ImportDetailDetail";

const ImportDetailClient: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const importId = Number(params.id);
  const theme = useTheme();

  const [importDetail, setImportDetail] = useState<InventoryImportItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const response: ImportDetailResponse = await getImportDetail(importId);
        if (response.status) {
          setImportDetail(response.data);
        } else {
          setError(response.message || "Error fetching detail");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    if (importId) {
      fetchDetail();
    }
  }, [importId]);

  const handleBack = () => {
    router.back();
  };

  // Đặt màu theo theme mode
  const bgColor = theme.palette.mode === "dark" ? "#121212" : "#f5f5f5";
  const containerBg = theme.palette.mode === "dark" ? "#1e1e1e" : "#fff";
  const textColor = theme.palette.mode === "dark" ? "#eee" : "#333";
  const paperBg = theme.palette.mode === "dark" ? "#2c2c2c" : "#fff";
  const boxShadow =
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(255 255 255 / 0.05)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)";
  const alertBg = theme.palette.mode === "dark" ? "#5a1e1e" : "#ffebe6";
  const alertTextColor = theme.palette.mode === "dark" ? "#ffbaba" : "#d32f2f";
  const buttonBorderColor = theme.palette.mode === "dark" ? "#bbb" : "#333";
  const buttonColor = theme.palette.mode === "dark" ? "#eee" : "#333";
  const buttonHoverBg = theme.palette.mode === "dark" ? "#333" : "#f0f0f0";
  const buttonHoverBorder = theme.palette.mode === "dark" ? "#888" : "#555";
  const circularColor = theme.palette.mode === "dark" ? "#eee" : "#333";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: bgColor,
        padding: 0,
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          padding: 4,
          textAlign: "center",
          backgroundColor: containerBg,
          borderRadius: "8px",
          boxShadow: boxShadow,
          color: textColor,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{
            mb: 2,
            borderColor: buttonBorderColor,
            color: buttonColor,
            "&:hover": {
              borderColor: buttonHoverBorder,
              backgroundColor: buttonHoverBg,
              transform: "scale(1.05)",
              boxShadow: theme.palette.mode === "dark"
                ? "0 2px 10px rgba(255 255 255 / 0.1)"
                : "0 2px 10px rgba(0, 0, 0, 0.1)",
            },
            transition: "all 0.3s ease",
            padding: "8px 20px",
            borderRadius: "30px",
            fontWeight: "bold",
          }}
        >
          Quay lại
        </Button>

        {loading ? (
          <CircularProgress sx={{ color: circularColor, size: 50 }} />
        ) : error ? (
          <Alert
            severity="error"
            sx={{
              width: "100%",
              mb: 2,
              borderRadius: "8px",
              backgroundColor: alertBg,
              color: alertTextColor,
            }}
          >
            {error}
          </Alert>
        ) : importDetail ? (
          <Paper
            sx={{
              p: 4,
              width: "100%",
              backgroundColor: paperBg,
              borderRadius: 3,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 16px rgba(255 255 255 / 0.05)"
                  : "0 8px 16px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              color: textColor,
            }}
          >
            <ImportDetailBasic data={importDetail} />
            <ImportDetailDetails
              details={importDetail.details}
              auditLogs={importDetail.auditLogs || []}
            />
          </Paper>
        ) : (
          <Typography variant="h6" sx={{ color: textColor, fontWeight: "bold" }}>
            Không tìm thấy dữ liệu.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImportDetailClient;
