"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Box,
  useTheme,
} from "@mui/material";

export interface DispatchFilterData {
  referenceNumber: string;
  createdByName: string;
  fromDate: string; // yyyy-MM-dd
  toDate: string;
  completedFrom: string;
  completedTo: string;
}

interface Props {
  open: boolean;
  initialFilters: DispatchFilterData;
  onClose: () => void;
  onSubmit: (filters: DispatchFilterData) => void;
}

const DispatchFilterDialog: React.FC<Props> = ({
  open,
  initialFilters,
  onClose,
  onSubmit,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [filters, setFilters] = useState<DispatchFilterData>(initialFilters);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleChange =
    (key: keyof DispatchFilterData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = () => {
    onSubmit(filters);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Màu theo theme mode
  const bgColor = isDark ? "#121212" : "#fff";
  const textColor = isDark ? "#eee" : "#000";
  const borderColor = isDark ? "#444" : "#000";
  const boxShadowColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.25)";
  const buttonContainedBg = isDark ? "#fff" : "#000";
  const buttonContainedColor = isDark ? "#000" : "#fff";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: bgColor,
          color: textColor,
          borderRadius: 3,
          boxShadow: `0 8px 16px ${boxShadowColor}`,
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
        },
      }}
      aria-labelledby="dispatch-filter-dialog-title"
    >
      <DialogTitle
        id="dispatch-filter-dialog-title"
        sx={{
          fontWeight: 700,
          fontSize: "1.5rem",
          backgroundColor: bgColor,
          borderBottom: `1px solid ${borderColor}`,
          mb: 3,
          userSelect: "none",
          color: textColor,
        }}
      >
        Lọc phiếu giao hàng
      </DialogTitle>

      <DialogContent>
        <Box component="form" onKeyDown={handleKeyDown} noValidate>
          <Grid container spacing={3}>
            {[
              { label: "Mã phiếu", key: "referenceNumber" },
              { label: "Người tạo", key: "createdByName" },
              { label: "Từ ngày tạo", key: "fromDate", type: "date" },
              { label: "Đến ngày tạo", key: "toDate", type: "date" },
              { label: "Hoàn tất từ", key: "completedFrom", type: "date" },
              { label: "Hoàn tất đến", key: "completedTo", type: "date" },
            ].map(({ label, key, type }, idx) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  label={label}
                  fullWidth
                  inputRef={idx === 0 ? firstInputRef : undefined}
                  value={filters[key as keyof DispatchFilterData]}
                  onChange={handleChange(key as keyof DispatchFilterData)}
                  variant="filled"
                  size="medium"
                  type={type ?? "text"}
                  InputLabelProps={type === "date" ? { shrink: true } : undefined}
                  sx={{
                    bgcolor: bgColor,
                    borderRadius: 2,
                    input: {
                      color: textColor,
                    },
                    "& .MuiInputLabel-root": {
                      color: textColor,
                      fontWeight: 700,
                    },
                    "& .MuiFilledInput-root": {
                      borderRadius: 2,
                      bgcolor: bgColor,
                      border: `1px solid transparent`,
                      transition: "border-color 0.3s",
                      "&:hover": {
                        borderColor: borderColor,
                      },
                      "&.Mui-focused": {
                        border: `2px solid ${borderColor}`,
                        bgcolor: bgColor,
                      },
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "flex-end",
          mt: 3,
          gap: 2,
          pt: 1,
          borderTop: `1px solid ${borderColor}`,
          backgroundColor: bgColor,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            color: textColor,
            borderColor: borderColor,
            fontWeight: 700,
            minWidth: 120,
            "&:hover": {
              borderColor: borderColor,
              backgroundColor: bgColor,
            },
          }}
          aria-label="Huỷ lọc phiếu giao hàng"
        >
          Huỷ
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="large"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            backgroundColor: buttonContainedBg,
            color: buttonContainedColor,
            fontWeight: 700,
            minWidth: 120,
            "&:hover": {
              backgroundColor: buttonContainedBg,
              opacity: 0.85,
            },
          }}
          aria-label="Áp dụng bộ lọc phiếu giao hàng"
        >
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DispatchFilterDialog;
