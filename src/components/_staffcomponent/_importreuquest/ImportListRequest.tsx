"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Pagination,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { filterStaffInventoryImports } from "@/ultis/importapi";
import {
  StaffInventoryImportStoreDetailDto,
  StaffImportFilterDto,
} from "@/type/importStaff";
import StaffImportRequestTable from "@/components/_staffcomponent/_importreuquest/StaffImportRequestTable";
import EmptyState from "@/components/_loading/EmptyState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportListRequest: React.FC = () => {
  const theme = useTheme();
  const [items, setItems] = useState<StaffInventoryImportStoreDetailDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<StaffImportFilterDto>(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("account");
    const staffId = stored ? JSON.parse(stored).roleDetails?.staffDetailId ?? 0 : 0;
    return {
      StaffDetailId: staffId,
      Status: undefined,
      SortBy: "importStoreId",
      IsDescending: true,
      Page: 1,
      PageSize: 10,
    };
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await filterStaffInventoryImports(filters);
      if (response.status) {
        setItems(response.data.data);
        setTotal(response.data.totalRecords);
      } else {
        setError(response.message || "Lỗi khi tải dữ liệu");
      }
    } catch {
      setError("Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (_: any, page: number) => {
    const updated = { ...filters, Page: page };
    setFilters(updated);
    fetchData();
  };

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDarkMode
          ? "#000"
          : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        padding: { xs: 3, md: 6 },
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontFamily: "Inter", color: isDarkMode ? "#fff" : "#111" }}
        >
          Yêu cầu nhập kho của nhân viên
        </Typography>
      </motion.div>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">{error}</Typography>
      ) : items.length === 0 ? (
        <EmptyState loading={false} />
      ) : (
        <Box
          sx={{
            backgroundColor: isDarkMode ? "#000" : "white",
            borderRadius: 3,
            boxShadow: 3,
            padding: 3,
            overflowX: "auto",
          }}
        >
          <StaffImportRequestTable
            items={items}
            loading={loading}
            onSortChange={(sortBy, isDesc) => {
              const updated = { ...filters, SortBy: sortBy, IsDescending: isDesc, Page: 1 };
              setFilters(updated);
              fetchData();
            }}
            sortBy={filters.SortBy!}
            isDescending={filters.IsDescending!}
            refreshData={fetchData}
          />
        </Box>
      )}

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(total / (filters.PageSize!))}
          page={filters.Page!}
          onChange={handlePageChange}
          shape="rounded"
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: 600,
              borderRadius: "12px",
              color: isDarkMode ? "#fff" : "#000",
            },
            "& .Mui-selected": {
              backgroundColor: isDarkMode ? "#fff" : "#111",
              color: isDarkMode ? "#111" : "#fff",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ImportListRequest;
