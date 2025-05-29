"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

interface CommentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (comment: string, actualReceivedQuantity: number) => void;
  actionType: "FullStock" | "Shortage";
  expectedQuantity?: number; // Optional, giúp user nhập số lượng chính xác hơn
}

const CommentDialog: React.FC<CommentDialogProps> = ({
  open,
  onClose,
  onSubmit,
  actionType,
  expectedQuantity,
}) => {
  const [comment, setComment] = useState("");
  const [actualReceivedQuantity, setActualReceivedQuantity] = useState<number>(0);

  const isFullStock = actionType === "FullStock";

  const handleSubmit = () => {
    const qty = isFullStock ? 0 : actualReceivedQuantity;
    onSubmit(comment.trim(), qty);
    setComment("");
    setActualReceivedQuantity(0);
  };

  const handleClose = () => {
    setComment("");
    setActualReceivedQuantity(0);
    onClose();
  };

  return (
  <Dialog
    open={open}
    onClose={handleClose}
    maxWidth="sm"
    fullWidth
    PaperProps={{
      sx: {
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
        animation: "fadeIn 0.3s ease-in-out",
      },
    }}
  >
    {/* HEADER */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 4,
        py: 2.5,
        background: isFullStock
          ? "linear-gradient(to right, #66bb6a, #2e7d32)"
          : "linear-gradient(to right, #ef5350, #b71c1c)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isFullStock ? (
          <CheckCircleIcon sx={{ color: "#fff", fontSize: 28 }} />
        ) : (
          <WarningAmberIcon sx={{ color: "#fff", fontSize: 28 }} />
        )}
      </Box>
      <DialogTitle
        sx={{
          m: 0,
          p: 0,
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "#fff",
        }}
      >
        {isFullStock ? "Cập nhật đầy đủ hàng" : "Cập nhật thiếu hàng"}
      </DialogTitle>
    </Box>

    {/* CONTENT */}
    <DialogContent sx={{ background: "#fefefe", px: 4, py: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography fontWeight={600}>📝 Ghi chú</Typography>
        <TextField
          placeholder="Nhập ghi chú liên quan đến đơn hàng..."
          multiline
          rows={3}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        {!isFullStock && (
          <>
            <Divider />
            <Box>
              <Typography fontWeight={600}>📦 Số lượng thực nhận</Typography>
              {expectedQuantity !== undefined && (
                <Typography variant="body2" sx={{ color: "#888", mt: 0.5 }}>
                  Số lượng yêu cầu:{" "}
                  <Typography
                    component="span"
                    fontWeight="bold"
                    color="#333"
                  >
                    {expectedQuantity}
                  </Typography>
                </Typography>
              )}
            </Box>
            <TextField
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={actualReceivedQuantity}
              onChange={(e) =>
                setActualReceivedQuantity(Math.max(0, Number(e.target.value)))
              }
              placeholder="Nhập số lượng thực tế nhận được..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </>
        )}
      </Box>
    </DialogContent>

    {/* ACTIONS */}
    <DialogActions sx={{ px: 4, py: 2.5, backgroundColor: "#fafafa" }}>
      <Button
        onClick={handleClose}
        variant="outlined"
        startIcon={<CloseIcon />}
        sx={{
          px: 3,
          borderRadius: 2,
          fontWeight: 600,
          borderColor: "#ccc",
          color: "#555",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            borderColor: "#888",
          },
        }}
      >
        Hủy
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        startIcon={<SendIcon />}
        sx={{
          px: 3,
          borderRadius: 2,
          fontWeight: 600,
          background: isFullStock
            ? "linear-gradient(to right, #66bb6a, #2e7d32)"
            : "linear-gradient(to right, #ef5350, #b71c1c)",
          color: "#fff",
          "&:hover": {
            background: isFullStock
              ? "linear-gradient(to right, #2e7d32, #1b5e20)"
              : "linear-gradient(to right, #b71c1c, #880e4f)",
          },
        }}
      >
        Gửi
      </Button>
    </DialogActions>
  </Dialog>
);
};

export default CommentDialog;
