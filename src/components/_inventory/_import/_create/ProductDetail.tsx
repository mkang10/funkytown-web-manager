"use client";

import React from "react";
import { Grid, TextField, useTheme } from "@mui/material";

interface ProductDetailsProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ quantity, onQuantityChange }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          label="Số lượng"
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          fullWidth
          InputLabelProps={{
            style: { color: isDark ? "#ccc" : undefined }
          }}
          sx={{
            input: {
              color: isDark ? "#fff" : "#000",
              backgroundColor: isDark ? theme.palette.background.default : "#fff",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: isDark ? "#555" : undefined,
              },
              "&:hover fieldset": {
                borderColor: isDark ? "#888" : undefined,
              },
              "&.Mui-focused fieldset": {
                borderColor: isDark ? theme.palette.primary.light : undefined,
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
