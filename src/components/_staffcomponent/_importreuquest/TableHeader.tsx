import { TableCell, TableRow, TableSortLabel, useMediaQuery, useTheme } from "@mui/material";

interface TableHeaderProps {
  sortBy: string;
  isDescending: boolean;
  onSortChange: (field: string) => void;
}

const headers = [
  { label: "Mã nhập kho", field: "importStoreId" },
  { label: "Sản phẩm", field: "productName" },
  { label: "Size", field: "sizeName" },
  { label: "Màu sắc", field: "colorName" },
  { label: "SL phân bổ", field: "allocatedQuantity" },
  { label: "SL thực tế", field: "actualReceivedQuantity" },
  { label: "Trạng thái", field: "status" },
  { label: "Thao tác" },
];

export default function TableHeader({ sortBy, isDescending, onSortChange }: TableHeaderProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableRow
      sx={{
        background: theme.palette.mode === "dark"
          ? "#121212"
          : "linear-gradient(90deg, #f0f4ff, #e0e7ff)",
        borderBottom: `2px solid ${theme.palette.divider}`,
      }}
    >
      {headers.map((col) => (
        <TableCell
          key={col.label}
          align="center"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: "bold",
            fontSize: isSmallScreen ? "0.7rem" : "0.85rem",
            px: isSmallScreen ? 1 : 2,
            display:
              isSmallScreen && ["Size", "Màu sắc", "Ghi chú"].includes(col.label)
                ? "none"
                : "table-cell",
          }}
        >
          {col.field ? (
            <TableSortLabel
              active={sortBy === col.field}
              direction={sortBy === col.field && isDescending ? "desc" : "asc"}
              onClick={() => onSortChange(col.field)}
              sx={{
                color: "inherit",
                "& .MuiTableSortLabel-icon": { color: "inherit !important" },
              }}
            >
              {col.label}
            </TableSortLabel>
          ) : (
            col.label
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
