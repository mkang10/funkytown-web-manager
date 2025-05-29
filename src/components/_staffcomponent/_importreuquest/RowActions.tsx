import React from "react";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AddShoppingCart, RemoveShoppingCart } from "@mui/icons-material";
import { StaffInventoryImportStoreDetailDto } from "@/type/importStaff";

interface RowActionsProps {
  item: StaffInventoryImportStoreDetailDto;
  onCommentClick: (
    item: StaffInventoryImportStoreDetailDto,
    type: "FullStock" | "Shortage"
  ) => void;
}

const RowActions = ({ item, onCommentClick }: RowActionsProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const status = item.status.trim().toLowerCase();

  if (status !== "processing") {
    return (
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Không khả dụng
      </Typography>
    );
  }

  return (
    <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
      {/* Nút Đủ hàng - Gradient xanh lá */}
      <Button
        variant="contained"
        size={isSmallScreen ? "small" : "medium"}
        startIcon={<AddShoppingCart />}
        onClick={() => onCommentClick(item, "FullStock")}
        sx={{
          background: "linear-gradient(90deg, #4caf50, #388e3c)", // xanh lá
          borderRadius: 20,
          textTransform: "none",
          fontWeight: 600,
          px: 2,
          boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)",
          "&:hover": {
            background: "linear-gradient(90deg, #388e3c, #2e7d32)",
            boxShadow: "0 6px 16px rgba(56, 142, 60, 0.5)",
          },
        }}
      >
        Đủ hàng
      </Button>

      {/* Nút Thiếu hàng - Gradient đỏ outline */}
      <Button
        variant="outlined"
        size={isSmallScreen ? "small" : "medium"}
        startIcon={<RemoveShoppingCart />}
        onClick={() => onCommentClick(item, "Shortage")}
        sx={{
          borderRadius: 20,
          textTransform: "none",
          fontWeight: 600,
          px: 2,
          color: "#f44336", // đỏ chính
          borderColor: "#f44336",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#d32f2f",
            backgroundColor: "rgba(244, 67, 54, 0.1)",
            color: "#d32f2f",
          },
        }}
      >
        Thiếu hàng
      </Button>
    </Box>
  );
};

export default RowActions;
