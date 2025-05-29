"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  Stack,
  Pagination,
  Skeleton,
  useTheme,
} from "@mui/material";

import { getDispatchByStaff } from "@/ultis/dispatchapinew";
import { updateFullStockDispatch } from "@/ultis/dispatch";
import { DispatchStoreDetail } from "@/type/dispatchnew";
import { FullStockDetail } from "@/type/importStaff";
import HeaderActions from "./HeaderActions";
import FilterCard from "./FilterCard";
import DispatchTable from "./DispatchTable";
import ConfirmDialog from "./ConfirmDialog";

const pageSize = 10;
const predefinedStatuses = ["All", "Pending", "Processing", "Completed", "Cancelled"];

const StaffDispatchPage: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const [rows, setRows] = useState<DispatchStoreDetail[]>([]);
  const [confirmRow, setConfirmRow] = useState<DispatchStoreDetail | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const accountStr = typeof window !== "undefined" ? localStorage.getItem("account") : null;
  const staffId = accountStr ? JSON.parse(accountStr).roleDetails?.staffDetailId : 0;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        StaffDetailId: staffId,
        Status: statusFilter !== "All" ? statusFilter : undefined,
        Page: page,
        PageSize: pageSize,
      };
      const resp = await getDispatchByStaff(params);
      setRows(resp.data.data);
      setTotal(resp.data.totalRecords);
    } catch (e) {
      console.error(e);
      toast.error("Lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, [staffId, statusFilter, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const confirmDone = async () => {
    if (!confirmRow) return;
    try {
      await updateFullStockDispatch(confirmRow.dispatchId, staffId, [
        {
          storeDetailId: confirmRow.dispatchStoreDetailId,
          actualReceivedQuantity: confirmRow.allocatedQuantity,
          comment: confirmRow.comments,
        } as FullStockDetail,
      ]);
      toast.success("Cập nhật xuất hàng thành công!");
      fetchData();
    } catch {
      toast.error("Lỗi khi cập nhật!");
    }
    setConfirmRow(null);
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} theme={theme.palette.mode === "dark" ? "dark" : "light"} />

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={3}
        gap={2}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
          Danh sách phiếu xuất kho
        </Typography>

        <HeaderActions onToggleFilter={() => setFiltersOpen(!filtersOpen)} onRefresh={fetchData} />
      </Box>

      {filtersOpen && (
        <FilterCard statuses={predefinedStatuses} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      )}

      {loading ? (
        <Box sx={{ mt: 2 }}>
          {[...Array(pageSize)].map((_, idx) => (
            <Skeleton key={idx} variant="rectangular" height={45} sx={{ mb: 1, borderRadius: 1 }} animation="wave" />
          ))}
        </Box>
      ) : rows.length === 0 ? (
        <Typography textAlign="center" color={theme.palette.text.secondary} mt={4} variant="h6" sx={{ fontStyle: "italic" }}>
          Không có dữ liệu phù hợp.
        </Typography>
      ) : (
        <DispatchTable rows={rows} router={router} onComplete={setConfirmRow} />
      )}

      <Box mt={4} display="flex" justifyContent="center">
  <Pagination
    count={Math.ceil(total / pageSize)}
    page={page}
    onChange={(_, v) => setPage(v)}
    shape="rounded"
    showFirstButton
    showLastButton
    sx={{
      "& .MuiPaginationItem-root": {
        color: theme.palette.mode === "dark" ? "#fff" : "#000",              // chữ trắng khi dark, đen khi light
        bgcolor: theme.palette.mode === "dark" ? "#000" : "#fff",             // nền đen khi dark, trắng khi light
        border: "1px solid",
        borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",         // viền trắng cho dark, đen cho light
        "&.Mui-selected": {
          bgcolor: theme.palette.mode === "dark" ? "#fff" : "#000",           // nền trắng cho item chọn dark mode, ngược lại
          color: theme.palette.mode === "dark" ? "#000" : "#fff",             // chữ đen cho item chọn dark mode, ngược lại
        },
        "&:hover": {
          bgcolor: theme.palette.mode === "dark" ? "#222" : "#ddd",           // hover nền xám đen/trắng tùy mode
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        },
      },
    }}
  />
</Box>


      <ConfirmDialog confirmRow={confirmRow} onClose={() => setConfirmRow(null)} onConfirm={confirmDone} />
    </Box>
  );
};

export default StaffDispatchPage;
