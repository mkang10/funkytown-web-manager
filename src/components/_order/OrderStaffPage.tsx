"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Container, useTheme, Fade } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { getAssignmentManagerOrders } from "@/ultis/OrderAPI";
import {
  AssignmentOrderFilters,
  AssignmentOrderResponse,
} from "@/type/order";

import FilterPanel from "./FilterPanel ";
import OrderTable from "./OrderTable";

const StaffOrderPage: React.FC = () => {
  const theme = useTheme();

  const accountStr = localStorage.getItem("account");
  if (!accountStr) throw new Error("Không tìm thấy thông tin tài khoản trong localStorage");
  const account = JSON.parse(accountStr);
  const staffDetailId = account?.roleDetails?.staffDetailId;
  if (!staffDetailId) throw new Error("Không tìm thấy shopManagerDetailId trong account");

  const [filters, setFilters] = useState<AssignmentOrderFilters>({
    staffId: staffDetailId,
    page: 1,
    pageSize: 10,
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [assignmentDateFrom, setAssignmentDateFrom] = useState("");
  const [assignmentDateTo, setAssignmentDateTo] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [fullNameContains, setFullNameContains] = useState("");
  const [rows, setRows] = useState<AssignmentOrderResponse[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleQuickRange = (days: number) => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - days);
    setAssignmentDateFrom(fromDate.toISOString().split("T")[0]);
    setAssignmentDateTo(toDate.toISOString().split("T")[0]);
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const payload: AssignmentOrderFilters = {
        ...filters,
        assignmentDateFrom: assignmentDateFrom || undefined,
        assignmentDateTo: assignmentDateTo || undefined,
        orderStatus: orderStatus || undefined,
        fullNameContains: fullNameContains || undefined,
      };
      const response = await getAssignmentManagerOrders(payload);
      setRows(response.data);
      setRowCount(response.totalRecords);
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, assignmentDateFrom, assignmentDateTo, orderStatus, fullNameContains]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <Fade in timeout={500}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontFamily: "Inter",
            color: theme.palette.mode === "dark" ? "#fff" : "#111",
          }}
        >
          Quản lý đơn hàng
        </Typography>
      </Fade>

      <FilterPanel
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen(!filterOpen)}
        assignmentDateFrom={assignmentDateFrom}
        assignmentDateTo={assignmentDateTo}
        orderStatus={orderStatus}
        fullNameContains={fullNameContains}
        onChangeAssignmentDateFrom={setAssignmentDateFrom}
        onChangeAssignmentDateTo={setAssignmentDateTo}
        onChangeOrderStatus={setOrderStatus}
        onChangeFullNameContains={setFullNameContains}
        onSearchClick={() => setFilters((prev) => ({ ...prev, page: 1 }))}
        onQuickRangeClick={handleQuickRange}
      />

      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#fff",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 8px rgba(0,0,0,0.7)"
              : "0 2px 8px rgba(0,0,0,0.1)",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Fade in timeout={500}>
          <Box>
            <OrderTable
              rows={rows}
              loading={loading}
              rowCount={rowCount}
              page={filters.page || 1}
              pageSize={filters.pageSize || 10}
              onPageChange={(newPage) =>
                setFilters((prev) => ({ ...prev, page: newPage }))
              }
              onRefresh={fetchData}
            />
          </Box>
        </Fade>
      </Box>
    </Container>
  );
};

export default StaffOrderPage;
