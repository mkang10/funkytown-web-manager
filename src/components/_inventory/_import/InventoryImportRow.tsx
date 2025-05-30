"use client";
import React from "react";
import { TableRow, TableCell, Chip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { InventoryImportItem } from "@/type/InventoryImport";

interface InventoryImportRowProps {
  item: InventoryImportItem;
}

// Bản đồ trạng thái sang nhãn và màu sắc
const statusMap: Record<
  InventoryImportItem["status"],
  { label: string; color: "default" | "primary" | "success" | "error" | "warning" | "info" }
> = {
  Pending: { label: "Chờ xử lý", color: "warning" },
  Approved: { label: "Đã duyệt", color: "success" },
  Rejected: { label: "Từ chối", color: "error" },
  Processing: { label: "Đang xử lý", color: "info" },
  Done: { label: "Hoàn thành", color: "primary" },
  "Partial Success": { label: "Thành công một phần", color: "warning" },
  Success: { label: "Thành công", color: "success" },
};

const InventoryImportRow: React.FC<InventoryImportRowProps> = ({ item }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { label, color } = statusMap[item.status] || { label: item.status, color: "default" };

  return (
    <TableRow
      hover
      sx={{
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "grey.100",
        },
      }}
    >
      <TableCell>
        <Typography variant="body2" color={isDark ? "text.primary" : "text.primary"}>
          {item.importId}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color={isDark ? "text.primary" : "text.primary"}>
          {item.referenceNumber}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color={isDark ? "text.primary" : "text.primary"}>
          {item.createdByName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color={isDark ? "text.primary" : "text.primary"}>
          {new Date(item.createdDate).toLocaleString("vi-VN")}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={label}
          color={color}
          size="small"
          variant="filled"
          sx={{ borderRadius: "8px", fontWeight: 600 }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" color={isDark ? "text.primary" : "text.primary"}>
          {item.totalCost.toLocaleString("vi-VN")}₫
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color={isDark ? "text.primary" : "text.primary"}>
          {item.approvedDate ? new Date(item.approvedDate).toLocaleString("vi-VN") : "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color={isDark ? "text.primary" : "text.primary"}>
          {item.completedDate ? new Date(item.completedDate).toLocaleString("vi-VN") : "-"}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default InventoryImportRow;
