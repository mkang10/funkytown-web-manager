"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  Button,
  Divider,
  Tooltip,
  Stack,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { AuditLog, DispatchStoreDetail } from "@/type/storeexportresponse";
import { getDispatchStoreDetailById } from "@/ultis/storeexport";
import { styled, useTheme } from "@mui/material/styles";

const RotatingHourglassIcon = styled(HourglassEmptyIcon)(({ theme }) => ({
  color: theme.palette.warning.main,
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

const DispatchStoreExportDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const theme = useTheme();
  const idParam = params.id;
  const [detail, setDetail] = useState<DispatchStoreDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function statusIcon(status: string): React.ReactElement | undefined {
    const s = status.trim().toLowerCase();
    if (s === "success") return <CheckCircleIcon fontSize="small" />;
    if (s === "processing") return <RotatingHourglassIcon fontSize="small" />;
    return undefined;
  }

  function statusColor(status: string): "success" | "warning" | "default" {
    const s = status.trim().toLowerCase();
    if (s === "success") return "success";
    if (s === "processing") return "warning";
    return "default";
  }

  useEffect(() => {
    const id = Number(idParam);
    if (!idParam || isNaN(id)) {
      setError("ID không hợp lệ");
      return;
    }
    setLoading(true);
    getDispatchStoreDetailById(id)
      .then((res) => {
        const rawData: any = res.data;
        const item = Array.isArray(rawData) ? rawData[0] : rawData;
        if (!item) {
          setError("Không có dữ liệu");
          return;
        }
        const detailObj: DispatchStoreDetail = {
          warehouseName: item.warehouseName,
          allocatedQuantity: item.allocatedQuantity,
          status: item.status,
          colorName: item.colorName,
          sizeName: item.sizeName,
          productName: item.productName,
          comments: item.comments ?? "",
          staff: item.staff ?? null,
          dispatchDetailId: item.dispatchDetailId,
          handleBy: item.handleBy,
          dispatchStoreDetailId: item.dispatchStoreDetailId,
          actualQuantity: item.actualQuantity ?? null,
          referenceNumber: item.referenceNumber,
          auditLogs: Array.isArray(item.auditLogs) ? item.auditLogs : [],
        };
        setDetail(detailObj);
      })
      .catch(() => setError("Không thể tải dữ liệu"))
      .finally(() => setLoading(false));
  }, [idParam]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={4} textAlign="center">
        <Typography color="error" variant="h6" mb={2}>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => router.back()}>
          Quay lại
        </Button>
      </Box>
    );
  }

  if (!detail) {
    return (
      <Box m={4} textAlign="center">
        <Typography>Không có dữ liệu để hiển thị.</Typography>
        <Button
          variant="outlined"
          onClick={() => router.back()}
          startIcon={<ArrowBackIosNewIcon />}
        >
          Quay lại
        </Button>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 4 }} maxWidth={1000} mx="auto">
      <Stack direction="row" alignItems="center" spacing={1} mb={4}>
        <Button
          variant="outlined"
          onClick={() => router.back()}
          startIcon={<ArrowBackIosNewIcon />}
          sx={{
            mt: 2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: 3,
            px: 4,
            py: 1.25,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#FFD54F' : '#FF8F00',
            border: '2px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? '#FFD54F' : '#FF8F00',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 213, 79, 0.08)'
                  : 'rgba(255, 143, 0, 0.08)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#FFCA28' : '#FF6F00',
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'scale(0.97)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)',
            },
          }}
        >
          Quay lại
        </Button>
        <Typography variant="h4" fontWeight="bold" noWrap>
          Xuất kho #{detail.referenceNumber}
        </Typography>
      </Stack>

      <Card
        sx={{
          mb: 5,
          boxShadow: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fcfcfc",
        }}
      >
        <CardHeader
          title="Thông tin chung"
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#f0f0f0",
            "& .MuiCardHeader-title": {
              fontWeight: 700,
              fontSize: "1.25rem",
            },
          }}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {[
              { label: "Kho", content: detail.warehouseName },
              { label: "Quản lý", content: detail.handleBy },
              { label: "Nhân viên", content: detail.staff || "-" },
              { label: "Sản phẩm", content: detail.productName || "-" },
              { label: "Kích thước", content: detail.sizeName || "-" },
              { label: "Màu sắc", content: detail.colorName || "-" },
              { label: "Đã phân bổ", content: detail.allocatedQuantity },
              { label: "Thực xuất", content: detail.actualQuantity ?? "-" },
              {
                label: "Trạng thái",
                content: (
                  <Tooltip title={`Trạng thái: ${detail.status}`} arrow>
                    <Chip
                      label={detail.status}
                      color={statusColor(detail.status)}
                      size="small"
                      icon={statusIcon(detail.status) || undefined}
                    />
                  </Tooltip>
                ),
              },
            ].map((item, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="body1">{item.content}</Typography>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color="text.secondary"
              >
                Ghi chú
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-line",
                  fontStyle: detail.comments ? "normal" : "italic",
                  color: detail.comments ? "text.primary" : "text.disabled",
                }}
              >
                {detail.comments || "-"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* === AUDIT LOGS === */}
      <Card
        sx={{
          boxShadow: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fafafa",
        }}
      >
        <CardHeader
          title="Lịch sử xử lý"
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#f0f0f0",
            "& .MuiCardHeader-title": {
              fontWeight: 700,
              fontSize: "1.25rem",
            },
          }}
        />
        <Divider />
        <CardContent>
          {detail.auditLogs.length === 0 ? (
            <Typography color="text.secondary" fontStyle="italic">
              Chưa có lịch sử xử lý nào.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {detail.auditLogs.map((log: AuditLog, idx: number) => (
                <Grid item xs={12} key={idx}>
                  <Box
                    p={2}
                    borderRadius={2}
                    sx={{
                      backgroundColor: theme.palette.mode === "dark"
                        ? "#2e2e2e"
                        : "#fff",
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      {log.changedByName} - {log.operation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(log.changeDate)}
                    </Typography>
                    {log.comment && (
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          fontStyle: "italic",
                          color: theme.palette.text.primary,
                        }}
                      >
                        Ghi chú: {log.comment}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DispatchStoreExportDetailPage;
