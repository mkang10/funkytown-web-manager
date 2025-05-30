"use client";

import React, { memo } from "react";
import { Box, Paper, Typography, Button, useTheme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";

interface Props {
  onOpenFilter: () => void;
  onRefresh: () => void;
}

const DispatchHeader: React.FC<Props> = ({ onOpenFilter, onRefresh }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      sx={{
        p: 3,
        mb: 2,
        backgroundColor: isDark ? theme.palette.background.paper : "#fff",
        borderRadius: 2,
        boxShadow: isDark
          ? "0 1px 6px rgba(255, 255, 255, 0.1)"
          : "0 1px 4px rgba(0,0,0,0.1)",
      }}
      component="header"
      role="banner"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          component="h1"
          sx={{ userSelect: "none", color: isDark ? "#fff" : "#000" }}
        >
          Danh sách phiếu điều phối xuất hàng
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={onOpenFilter}
            aria-label="Mở bộ lọc"
            sx={{
              backgroundColor: isDark ? "#fff" : "#000",
              color: isDark ? "#000" : "#fff",
              textTransform: "none",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: isDark ? "#eee" : "#222",
              },
              flexGrow: { xs: 1, sm: 0 },
            }}
          >
            Bộ lọc
          </Button>

         
        </Box>
      </Box>
    </Paper>
  );
};

export default memo(DispatchHeader);
