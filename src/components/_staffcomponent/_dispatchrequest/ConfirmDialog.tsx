import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DispatchStoreDetail } from "@/type/dispatchnew";

const ConfirmDialog: React.FC<{
  confirmRow: DispatchStoreDetail | null;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ confirmRow, onClose, onConfirm }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Dialog
      open={!!confirmRow}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: isDark ? "#1e1e1e" : "#fff",
          boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 3,
          py: 2,
          background: isDark
            ? "linear-gradient(to right, #1976d2, #0d47a1)"
            : "linear-gradient(to right, #64b5f6, #1976d2)",
        }}
      >
        <CheckCircleIcon sx={{ color: "#fff", fontSize: 28 }} />
        <DialogTitle
          sx={{
            m: 0,
            p: 0,
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#fff",
          }}
        >
          Xác nhận hoàn thành
        </DialogTitle>
      </Box>

      {/* Nội dung */}
      <DialogContent
        sx={{
          px: 3,
          py: 2.5,
          color: isDark ? "#e0e0e0" : "#333",
          backgroundColor: isDark ? "#1e1e1e" : "#fafafa",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          Bạn có chắc muốn hoàn thành phiếu xuất kho ID:{" "}
          <strong>{confirmRow?.dispatchStoreDetailId}</strong>?
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: isDark ? "#90a4ae" : "#607d8b" }}
        >
          Sau khi xác nhận, phiếu này sẽ được đánh dấu là đã xuất kho và không thể chỉnh sửa.
        </Typography>
      </DialogContent>

      {/* Hành động */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          backgroundColor: isDark ? "#121212" : "#f5f5f5",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: isDark ? "#f44336" : "#d32f2f",
            color: isDark ? "#f44336" : "#d32f2f",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            "&:hover": {
              backgroundColor: isDark ? "#2c2c2c" : "#fff3f3",
              borderColor: "#e53935",
            },
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            background: isDark
              ? "linear-gradient(to right, #42a5f5, #1e88e5)"
              : "linear-gradient(to right, #1976d2, #1565c0)",
            fontWeight: 600,
            color: "#fff",
            borderRadius: 2,
            px: 3,
            "&:hover": {
              background: isDark
                ? "linear-gradient(to right, #1e88e5, #0d47a1)"
                : "linear-gradient(to right, #1565c0, #0d47a1)",
            },
          }}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
