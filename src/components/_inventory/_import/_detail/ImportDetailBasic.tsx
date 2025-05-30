"use client";
// components/inventory/import/ImportDetailBasic.tsx
import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { InventoryImportItem } from "@/type/importdetail";

interface ImportDetailBasicProps {
  data: InventoryImportItem;
}

const ImportDetailBasic: React.FC<ImportDetailBasicProps> = ({ data }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? "#121212" : "#fff",
        color: isDarkMode ? "#eee" : "#000",
        padding: 3,
        borderRadius: 1,
        boxShadow: isDarkMode
          ? "0 2px 4px rgba(255, 255, 255, 0.1)"
          : "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: isDarkMode ? "1px solid #333" : "1px solid #ddd",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: isDarkMode ? "#fff" : "#000" }}
      >
        Chi tiết nhập kho #{data.importId}
      </Typography>

      {[
        { label: "Số tham chiếu", value: data.referenceNumber },
        { label: "Người tạo", value: data.createdByName },
        {
          label: "Ngày tạo",
          value: new Date(data.createdDate).toLocaleString(),
        },
        { label: "Trạng thái", value: data.status },
        {
          label: "Tổng chi phí",
          value: data.totalCost.toLocaleString() + " VND",
        },
        {
          label: "Ngày phê duyệt",
          value: data.approvedDate
            ? new Date(data.approvedDate).toLocaleString()
            : "-",
        },
        {
          label: "Ngày hoàn thành",
          value: data.completedDate
            ? new Date(data.completedDate).toLocaleString()
            : "-",
        },
      ].map(({ label, value }) => (
        <Typography
          key={label}
          variant="body1"
          gutterBottom
          sx={{ color: isDarkMode ? "#ccc" : "#333" }}
        >
          <strong>{label}:</strong> {value}
        </Typography>
      ))}
    </Box>
  );
};

export default ImportDetailBasic;
