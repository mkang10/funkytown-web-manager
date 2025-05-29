"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getImportStoreDetailById } from "@/ultis/importstoredetail";
import { AuditLog, ImportStoreDetail } from "@/type/importstore";
import StatusChip from "../_staffcomponent/_importreuquest/StatusChip";

const ImportStoreDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const theme = useTheme();
  const id = params.id;
  const [detail, setDetail] = useState<ImportStoreDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<"logs">("logs");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getImportStoreDetailById(Number(id))
      .then((res) => setDetail(res.data))
      .catch(() => setError("Không thể tải dữ liệu chi tiết nhập kho."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleTabChange = (_: React.SyntheticEvent, value: "logs") => {
    setTabValue(value);
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        bgcolor={theme.palette.mode === "dark" ? "#121212" : "#f9f9f9"}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={4} textAlign="center">
        <Typography
          color="error"
          variant="h6"
          sx={{ mb: 2 }}
          className="dark:text-red-400"
        >
          {error}
        </Typography>
        <Button variant="outlined" onClick={() => router.back()}>
          Thử lại
        </Button>
      </Box>
    );
  }

  if (!detail) {
    return (
      <Box m={4} textAlign="center">
        <Typography
          variant="body1"
          sx={{ mb: 2 }}
          className="dark:text-white"
        >
          Không có dữ liệu để hiển thị.
        </Typography>
        <Button variant="outlined" onClick={() => router.back()}>
          Quay lại
        </Button>
      </Box>
    );
  }

  return (
    <Box
      p={{ xs: 2, sm: 4 }}
      maxWidth="1200px"
      margin="0 auto"
      className="transition-all duration-300 dark:bg-black dark:text-white"
    >
      {/* Header và nút Back */}
      <Box display="flex" alignItems="center" mb={4} gap={1}>
        <Tooltip title="Quay lại">
          <IconButton
            onClick={() => router.back()}
            className="dark:text-white transition-all duration-300"
            size="large"
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark" ? "grey.800" : "grey.300",
              },
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              transition: "background-color 0.3s ease",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography
          variant="h5"
          fontWeight="bold"
          className="dark:text-white transition-all duration-300"
        >
          Nhập kho #{detail.referenceNumber}
        </Typography>
      </Box>

      {/* Thông tin chung */}
      <Card
        variant="outlined"
        sx={{
          mb: 5,
          borderRadius: 3,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 12px rgba(0,0,0,0.9)"
              : "0 2px 8px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          backgroundColor:
            theme.palette.mode === "dark" ? "#121212" : theme.palette.background.paper,
          borderColor: theme.palette.divider,
        }}
        className="transition-all duration-300"
      >
        <CardHeader
          title="Thông tin chung"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark" ? "#1e1e1e" : theme.palette.grey[100],
            pb: 1,
            px: 3,
            transition: "all 0.3s ease",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
          titleTypographyProps={{ fontWeight: "bold", fontSize: "1.25rem" }}
        />
        <CardContent sx={{ px: 3, pt: 2, pb: 3 }}>
          <Grid container spacing={4}>
            {[
              ["Kho", detail.warehouseName],
              ["Trạng thái", <StatusChip key="status" status={detail.status} />],
              ["Nhân viên", detail.staff],
              ["Sản phẩm", detail.productName],
              ["Màu", detail.colorName],
              ["Size", detail.sizeName],
              ["Ghi chú", detail.comments || "-"],
              ["Đã nhận", detail.actualReceivedQuantity],
              ["Phân bổ", detail.allocatedQuantity],
              ["Giá vốn", detail.costPrice ?? "-"],
            ].map(([label, value], i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  className="dark:text-gray-300"
                  sx={{ mb: 0.8 }}
                >
                  {label}
                </Typography>
                <Typography
                  variant="body1"
                  className="transition-all duration-300 dark:text-white"
                  sx={{ wordBreak: "break-word" }}
                >
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          mb: 2,
          backgroundColor:
            theme.palette.mode === "dark" ? "#1e1e1e" : theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 12px rgba(0,0,0,0.9)"
              : "0 2px 8px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Chi tiết nhập kho tabs"
          sx={{
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: 3,
            },
          }}
        >
          <Tab
            label="Lịch sử thao tác"
            value="logs"
            className="dark:text-white"
            sx={{ fontWeight: "bold" }}
          />
        </Tabs>
      </Paper>

      {/* Nội dung tab */}
      {tabValue === "logs" && (
        <TableContainer
          component={Paper}
          sx={{
            mt: 1,
            borderRadius: 3,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 2px 12px rgba(0,0,0,0.9)"
                : "0 2px 8px rgba(0,0,0,0.1)",
            backgroundColor:
              theme.palette.mode === "dark" ? "#121212" : theme.palette.background.paper,
            transition: "all 0.3s ease",
          }}
        >
          <Table size="small" aria-label="Lịch sử thao tác bảng">
            <TableHead>
              <TableRow>
                {["Thao tác", "Thời gian", "Người thực hiện", "Ghi chú"].map(
                  (header, i) => (
                    <TableCell
                      key={i}
                      className="dark:text-gray-300"
                      sx={{ fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {detail.auditLogs.map((log: AuditLog) => (
                <TableRow
                  key={log.auditLogId}
                  hover
                  sx={{
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "#1f1f1f"
                          : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  <TableCell sx={{ maxWidth: 150, wordBreak: "break-word" }}>
                    {log.operation}
                  </TableCell>
                  <TableCell>{formatDate(log.changeDate)}</TableCell>
                  <TableCell>{log.changedByName}</TableCell>
                  <TableCell sx={{ maxWidth: 300, wordBreak: "break-word" }}>
                    {log.comment || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ImportStoreDetailPage;
