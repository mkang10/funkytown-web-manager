"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  Alert,
  Box,
  Button,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { filterInventoryImports, importInventoryFromExcel } from "@/ultis/importapi";
import { InventoryImportItem } from "@/type/InventoryImport";
import FilterDialog, { FilterData } from "@/components/_inventory/_import/FilterForm";
import InventoryImportTable from "@/components/_inventory/_import/InventoryImportTable";
import CreateInventoryImportModal from "@/components/_inventory/_import/_create/CreateInventoryImportModal";

const InventoryImportListClient: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [inventoryImports, setInventoryImports] = useState<InventoryImportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<FilterData>({
    Status: "",
    ReferenceNumber: "",
    FromDate: "",
    ToDate: "",
    SortBy: "ImportId",
    IsDescending: true,
    Page: 1,
    PageSize: 10,
  });

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    const baseFilters = { ...filters };
    if (storedAccount) {
      const account = JSON.parse(storedAccount);
      baseFilters.HandleBy = account.roleDetails?.shopManagerDetailId || "";
    }
    fetchData(baseFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (customFilters?: FilterData) => {
    setLoading(true);
    setError("");
    try {
      const appliedFilters = customFilters || filters;
      const response = await filterInventoryImports(appliedFilters);
      if (response.status) {
        setInventoryImports(response.data.data);
        setTotalCount(response.data.totalRecords);
      } else {
        setError(response.message || "Lỗi khi tải dữ liệu");
      }
    } catch {
      setError("Đã xảy ra lỗi khi truy vấn dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenFilterDialog = () => setFilterDialogOpen(true);
  const handleCloseFilterDialog = () => setFilterDialogOpen(false);

  const handleApplyFilters = (applied: FilterData) => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      const account = JSON.parse(storedAccount);
      applied.HandleBy = account.roleDetails?.shopManagerDetailId || "";
    }
    applied.Page = 1;
    setFilters(applied);
    fetchData(applied);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    const next = { ...filters, Page: page };
    setFilters(next);
    fetchData(next);
  };

  const handleSortChange = (field: string, desc: boolean) => {
    const next = { ...filters, SortBy: field, IsDescending: desc, Page: 1 };
    setFilters(next);
    fetchData(next);
  };

  const handleCreationSuccess = () => {
    toast.success("Tạo phiếu nhập kho thành công!");
    fetchData(filters);
  };

  const onClickImport = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const stored = localStorage.getItem("account");
    const account = stored ? JSON.parse(stored) : null;
    const warehouseId = account?.roleDetails?.storeId ?? 0;
    const createdBy = account?.accountId ?? 0;

    if (!warehouseId) {
      toast.error("Vui lòng chọn kho trước khi nhập từ Excel.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setLoading(true);
    try {
      const response = await importInventoryFromExcel(file, warehouseId, createdBy);
      if (!response.status) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        fetchData(filters);
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi khi nhập từ Excel. Vui lòng thử lại.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const totalPages = Math.ceil(totalCount / Number(filters.PageSize));

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: isDarkMode ? "#121212" : "#f5f5f5",
        minHeight: "100vh",
        color: isDarkMode ? "#eee" : "#111",
      }}
    >
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
          border: `1px solid ${isDarkMode ? "#333" : "#ddd"}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: isDarkMode
            ? "0px 3px 15px rgba(255, 255, 255, 0.05)"
            : "0px 3px 15px rgba(0, 0, 0, 0.05)",
        }}
        elevation={0}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{ color: isDarkMode ? "#fff" : "#111" }}
        >
          Danh sách phiếu nhập kho
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleOpenFilterDialog}
            sx={{
              textTransform: "none",
              borderColor: isDarkMode ? "#eee" : "#000",
              color: isDarkMode ? "#eee" : "#000",
              "&:hover": {
                backgroundColor: isDarkMode ? "#333" : "#eee",
              },
              fontWeight: 500,
            }}
          >
            Lọc
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)}
            sx={{
              textTransform: "none",
              backgroundColor: isDarkMode ? "#bbb" : "#000",
              color: isDarkMode ? "#121212" : "#fff",
              "&:hover": {
                backgroundColor: isDarkMode ? "#999" : "#222",
              },
              fontWeight: 500,
            }}
          >
            Tạo phiếu
          </Button>
          <Button
            variant="contained"
            onClick={onClickImport}
            disabled={loading}
            sx={{
              textTransform: "none",
              backgroundColor: isDarkMode ? "#009688" : "#00695c",
              color: "#fff",
              "&:hover": {
                backgroundColor: isDarkMode ? "#00796b" : "#004d40",
              },
              fontWeight: 500,
            }}
          >
            Nhập từ Excel
          </Button>
          <Button
            variant="contained"
            href="https://res.cloudinary.com/dvbbfcxdz/raw/upload/v1746733836/import_test_-_Copy_dsatn2.xlsx"
            download
            sx={{
              textTransform: "none",
              backgroundColor: isDarkMode ? "#7986cb" : "#3f51b5",
              color: "#fff",
              "&:hover": {
                backgroundColor: isDarkMode ? "#5c6bc0" : "#303f9f",
              },
              fontWeight: 500,
              marginLeft: 2,
            }}
          >
            Tải phiếu mẫu
          </Button>
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={onFileChange}
          />
        </Box>
        <CreateInventoryImportModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={handleCreationSuccess}
        />
      </Paper>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            backgroundColor: isDarkMode ? "#422b2b" : undefined,
            color: isDarkMode ? "#fdd" : undefined,
          }}
        >
          {error}
        </Alert>
      )}

      <Paper
        sx={{
          borderRadius: "12px",
          border: `1px solid ${isDarkMode ? "#333" : "#ddd"}`,
          overflow: "hidden",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
        }}
        elevation={0}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <InventoryImportTable
            items={inventoryImports}
            sortBy={filters.SortBy ?? "ImportId"}
            isDescending={filters.IsDescending ?? false}
            onSortChange={handleSortChange}
          />
        )}
      </Paper>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={filters.Page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: isDarkMode ? "#eee" : "#000",
              borderColor: isDarkMode ? "#eee" : "#000",
            },
          }}
        />
      </Box>

      <FilterDialog
        open={filterDialogOpen}
        onClose={handleCloseFilterDialog}
        onSubmit={handleApplyFilters}
        initialFilters={filters}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"} // Đổi theme toast
      />
    </Box>
  );
};

export default InventoryImportListClient;
