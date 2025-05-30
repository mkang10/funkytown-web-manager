"use client";
import React from "react";
import { DialogActions, Button, Box, useTheme } from "@mui/material";

export interface CreateInventoryImportModalActionsProps {
  loading: boolean;
  onCancel: () => void;
}

const CreateInventoryImportModalActions: React.FC<CreateInventoryImportModalActionsProps> = ({
  loading,
  onCancel,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <DialogActions sx={{ px: 0, justifyContent: "flex-end" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            color: isDark ? "#ddd" : "#333",
            borderColor: isDark ? "#555" : "#333",
            borderRadius: "50px",
            textTransform: "none",
            padding: "8px 20px",
            boxShadow: isDark
              ? "0 2px 6px rgba(255, 255, 255, 0.1)"
              : "0 2px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: isDark ? "#444" : "#f5f5f5",
              borderColor: isDark ? "#888" : "#666",
            },
          }}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: isDark ? "#fff" : "#000",
            color: isDark ? "#000" : "#fff",
            borderRadius: "50px",
            textTransform: "none",
            padding: "8px 20px",
            boxShadow: isDark
              ? "0 2px 10px rgba(255, 255, 255, 0.15)"
              : "0 2px 10px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: isDark ? "#ddd" : "#222",
            },
          }}
        >
          {loading ? "Đang xử lý..." : "Tạo phiếu nhập"}
        </Button>
      </Box>
    </DialogActions>
  );
};

export default CreateInventoryImportModalActions;
