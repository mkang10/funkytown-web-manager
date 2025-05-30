"use client";

import React from "react";
import { Box, Pagination, useTheme } from "@mui/material";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DispatchPagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: isDark ? "#121212" : "#f9f9f9",
        py: 2,
        boxShadow: isDark
          ? "0 -2px 10px rgba(255, 255, 255, 0.1)"
          : "0 -2px 10px rgba(0,0,0,0.05)",
        borderTop: isDark ? "1px solid #333" : "1px solid #e0e0e0",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, p) => onPageChange(p)}
          shape="rounded"
          size="medium"
          sx={{
            ".MuiPaginationItem-root": {
              fontWeight: 500,
              borderRadius: "12px",
              minWidth: 36,
              height: 36,
              color: isDark ? "#ccc" : undefined,
              borderColor: isDark ? "#555" : undefined,
              "&.Mui-selected": {
                backgroundColor: isDark ? "#fff" : "#000",
                color: isDark ? "#000" : "#fff",
                "&:hover": {
                  backgroundColor: isDark ? "#eee" : "#111",
                },
              },
              "&:hover": {
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default DispatchPagination;
