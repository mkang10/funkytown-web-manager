"use client";
import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Typography, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface VariantRowProps {
  index: number;
  costPrice: number;
  quantity: number;
  allocatedQuantity: number;
  productDisplay: string;
  onVariantClick: (index: number) => void;
  oncostPriceChange: (index: number, value: number) => void;
  onQuantityChange: (index: number, value: number) => void;
  onRemoveRow: (index: number) => void;
}

const VariantRow: React.FC<VariantRowProps> = ({
  index,
  costPrice,
  quantity,
  allocatedQuantity,
  productDisplay,
  onVariantClick,
  oncostPriceChange,
  onQuantityChange,
  onRemoveRow,
}) => {
  const theme = useTheme();

  const [localcostPrice, setLocalcostPrice] = useState<string>(
    costPrice !== 0 ? (costPrice / 1000).toString() : ""
  );
  const [localQuantity, setLocalQuantity] = useState<string>(
    quantity !== 0 ? quantity.toString() : ""
  );

  useEffect(() => {
    setLocalcostPrice(costPrice !== 0 ? (costPrice / 1000).toString() : "");
  }, [costPrice]);

  useEffect(() => {
    setLocalQuantity(quantity !== 0 ? quantity.toString() : "");
  }, [quantity]);

  const parsedcostPrice = parseFloat(localcostPrice) || 0;
  const parsedQuantity = parseInt(localQuantity, 10) || 0;
  const costPriceNegativeError = localcostPrice !== "" && parsedcostPrice < 0;
  const quantityNegativeError = localQuantity !== "" && parsedQuantity < 0;

  const freezecostPrice = localcostPrice !== "" && localcostPrice[0] === "0";
  const freezeQuantity = localQuantity !== "" && localQuantity[0] === "0";

  // Màu sắc tùy theo theme mode
  const bgColor = theme.palette.mode === "dark" ? "#222" : "#fff";
  const borderColor = theme.palette.mode === "dark" ? "#555" : "#ddd";
  const textColor = theme.palette.mode === "dark" ? "#eee" : "#000";

  return (
    <Box
      sx={{
        border: `1px solid ${borderColor}`,
        p: 2,
        borderRadius: 1,
        position: "relative",
        mb: 2,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextField
          label="Biến thể sản phẩm"
          value={productDisplay}
          onClick={() => onVariantClick(index)}
          fullWidth
          InputProps={{
            readOnly: true,
            sx: {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              cursor: "pointer",
              color: textColor,
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: textColor, // để text trong readOnly màu đúng
              },
            },
          }}
          placeholder="Chọn Biến thể Sản phẩm"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fafafa",
              "& fieldset": {
                borderColor: borderColor,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
        {index > 0 && (
          <IconButton onClick={() => onRemoveRow(index)} sx={{ ml: 1 }} size="small">
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <TextField
          label="Số lượng"
          type="number"
          value={localQuantity}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue !== "" && newValue[0] === "0") return;
            setLocalQuantity(newValue);
            const num = newValue === "" ? 0 : parseInt(newValue, 10);
            onQuantityChange(index, isNaN(num) ? 0 : num);
          }}
          fullWidth
          inputProps={{ min: 0 }}
          error={quantityNegativeError || freezeQuantity}
          helperText={
            freezeQuantity
              ? "Số lượng không được bắt đầu bằng số 0. Vui lòng xóa số 0."
              : quantityNegativeError
              ? "Số lượng phải là số dương"
              : ""
          }
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fafafa",
              "& fieldset": {
                borderColor: quantityNegativeError || freezeQuantity ? theme.palette.error.main : borderColor,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
            input: {
              color: textColor,
            },
            label: {
              color: textColor,
            },
          }}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Số lượng phân bổ: {allocatedQuantity}
        </Typography>
      </Box>
    </Box>
  );
};

export default VariantRow;
