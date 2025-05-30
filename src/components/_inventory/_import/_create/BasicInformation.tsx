"use client";
import React from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";

export interface BasicInformationProps {
  selectedVariantId: number;
  costPrice: number;
  oncostPriceChange: (value: number) => void;
  onProductVariantChange: (variantId: number) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  selectedVariantId,
  costPrice,
  oncostPriceChange,
  onProductVariantChange,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography
        variant="h6"
        sx={{ color: isDark ? theme.palette.text.primary : "initial" }}
      >
        Basic Information
      </Typography>

      <TextField
        label="Product Variant ID"
        type="number"
        value={selectedVariantId}
        onChange={(e) => onProductVariantChange(parseInt(e.target.value))}
        fullWidth
        variant="outlined"
        sx={{
          bgcolor: isDark ? theme.palette.background.paper : "transparent",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isDark ? theme.palette.divider : undefined,
          },
          "& .MuiInputBase-input": {
            color: isDark ? theme.palette.text.primary : undefined,
          },
          "& label": {
            color: isDark ? theme.palette.text.secondary : undefined,
          },
        }}
      />

      <TextField
        label="Unit Price"
        type="number"
        value={costPrice}
        onChange={(e) => oncostPriceChange(parseFloat(e.target.value))}
        fullWidth
        variant="outlined"
        sx={{
          bgcolor: isDark ? theme.palette.background.paper : "transparent",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isDark ? theme.palette.divider : undefined,
          },
          "& .MuiInputBase-input": {
            color: isDark ? theme.palette.text.primary : undefined,
          },
          "& label": {
            color: isDark ? theme.palette.text.secondary : undefined,
          },
        }}
      />
    </Box>
  );
};

export default BasicInformation;
