"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { InventoryImportItem } from "@/type/InventoryImport";
import { useRouter } from "next/navigation";
import { getStatusColor } from "@/ultis/UI";

interface InventoryImportTableProps {
  items: InventoryImportItem[];
  sortBy: string;
  isDescending: boolean;
  onSortChange: (sortField: string, isDescending: boolean) => void;
}

const InventoryImportTable: React.FC<InventoryImportTableProps> = ({
  items,
  sortBy,
  isDescending,
  onSortChange,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleRowClick = (importId: number) => {
    router.push(`/inventory/import/${importId}`);
  };

  const createSortHandler = (field: string) => () => {
    const isActive = sortBy === field;
    const newIsDescending = isActive ? !isDescending : false;
    onSortChange(field, newIsDescending);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: isDark ? theme.palette.background.default : "#fff" }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          backgroundColor: isDark ? theme.palette.background.paper : "#fff",
          border: `1px solid ${isDark ? theme.palette.divider : "#e0e0e0"}`,
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: isDark ? theme.palette.action.hover : "#f5f5f5" }}>
                {[
                  { label: "Mã nhập", field: "ImportId" },
                  { label: "Mã tham chiếu", field: "ReferenceNumber" },
                  { label: "Người tạo", field: "CreatedByName" },
                  { label: "Ngày tạo", field: "CreatedDate" },
                ].map(({ label, field }) => (
                  <TableCell key={field} align="center" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                    <TableSortLabel
                      active={sortBy === field}
                      direction={sortBy === field && isDescending ? "desc" : "asc"}
                      onClick={createSortHandler(field)}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="center" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  Trạng thái
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.importId}
                  hover
                  sx={{
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#fafafa",
                    },
                  }}
                  onClick={() => handleRowClick(item.importId)}
                >
                  <TableCell align="center">
                    <Typography variant="body2" color="text.primary">
                      {item.importId}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.primary">
                      {item.referenceNumber}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.primary">
                      {item.createdByName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.primary">
                      {new Date(item.createdDate).toLocaleString("vi-VN")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={item.status === "Partial Success" ? "Phiếu nhập thiếu sản phẩm" : ""}>
                      <Box
                        sx={{
                          backgroundColor: getStatusColor(item.status),
                          color: "#fff",
                          fontWeight: 600,
                          borderRadius: "8px",
                          px: 2,
                          py: 0.5,
                          display: "inline-block",
                          fontSize: "0.875rem",
                        }}
                      >
                        {item.status}
                      </Box>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default InventoryImportTable;
