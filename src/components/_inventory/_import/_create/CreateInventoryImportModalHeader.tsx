"use client";
import React from "react";
import { DialogTitle, Typography, useTheme } from "@mui/material";

const CreateInventoryImportModalHeader: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <DialogTitle
      sx={{
        px: 4,
        pt: 3,
        pb: 2,
        backgroundColor: isDark ? theme.palette.background.paper : "#fff",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="600"
        color={isDark ? "white" : "black"}
        sx={{ letterSpacing: 0.5 }}
      >
        Tạo phiếu nhập kho
      </Typography>
    </DialogTitle>
  );
};

export default CreateInventoryImportModalHeader;
