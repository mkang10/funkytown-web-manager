"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Pagination,
  CircularProgress,
  Typography,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productVariant } from "@/type/Product";
import { getProductVariants } from "@/ultis/importapi";

interface ProductVariantDialogSelectProps {
  open: boolean;
  onClose: () => void;
  onSelect: (variant: productVariant) => void;
  selectedVariantIds?: number[];
}

const ProductVariantDialogSelect: React.FC<ProductVariantDialogSelectProps> = ({
  open,
  onClose,
  onSelect,
  selectedVariantIds = [],
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [variants, setVariants] = useState<productVariant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const pageSize = 5;

  useEffect(() => {
    if (!open) return;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getProductVariants(page, pageSize, search);
        setVariants(result.data);
        setTotalRecords(result.totalRecords);
      } catch {
        setError("Không tải được danh sách biến thể");
        toast.error("Không tải được danh sách biến thể");
      } finally {
        setLoading(false);
      }
    })();
  }, [open, page, search]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSelect = (variant: productVariant) => {
    if (selectedVariantIds.includes(variant.variantId)) {
      toast.error("Sản phẩm này đã được chọn ở dòng khác.");
      return;
    }
    onSelect(variant);
    toast.success(`Đã chọn: ${variant.productName} - ${variant.sizeName} - ${variant.colorName}`);
    onClose();
  };

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            p: 3,
            height: 520,
            backgroundColor: isDark ? theme.palette.background.paper : "#fff",
            border: isDark ? `1px solid ${theme.palette.divider}` : "1px solid #e0e0e0",
            borderRadius: "12px",
            boxShadow: isDark
              ? "0 4px 16px rgba(255 255 255 / 0.08)"
              : "0 4px 16px rgba(0,0,0,0.08)",
          },
        }}
      >
        <DialogTitle sx={{ p: 0, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: isDark ? theme.palette.text.primary : "#222",
              borderBottom: isDark
                ? `1px solid ${theme.palette.divider}`
                : "1px solid #e0e0e0",
              pb: 1,
            }}
          >
            Chọn biến thể sản phẩm
          </Typography>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={handleSearchChange}
              sx={{
                backgroundColor: isDark ? theme.palette.background.default : "#fafafa",
                borderRadius: 1,
                input: {
                  color: isDark ? theme.palette.text.primary : "inherit",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDark ? theme.palette.divider : undefined,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDark ? theme.palette.text.primary : undefined,
                },
              }}
            />
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={28} color={isDark ? "inherit" : "primary"} />
            </Box>
          ) : error ? (
            <Typography sx={{ color: "error.main", textAlign: "center", py: 2 }}>
              {error}
            </Typography>
          ) : variants.length === 0 ? (
            <Typography
              sx={{
                color: isDark ? theme.palette.text.secondary : "text.secondary",
                textAlign: "center",
                py: 2,
              }}
            >
              Không có kết quả
            </Typography>
          ) : (
            <>
              <List sx={{ maxHeight: 300, overflowY: "auto", p: 0, mb: 2 }}>
                {variants.map((variant) => {
                  const disabled = selectedVariantIds.includes(variant.variantId);
                  return (
                    <ListItem key={variant.variantId} disableGutters sx={{ mb: 1 }}>
                      <Tooltip title={disabled ? "Sản phẩm đã được chọn ở dòng khác" : ""} arrow>
                        <span style={{ width: "100%" }}>
                          <ListItemButton
                            onClick={() => handleSelect(variant)}
                            disabled={disabled}
                            sx={{
                              border: isDark
                                ? `1px solid ${theme.palette.divider}`
                                : "1px solid #e0e0e0",
                              borderRadius: 2,
                              px: 2,
                              py: 1,
                              backgroundColor: isDark
                                ? theme.palette.background.default
                                : "#fafafa",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: isDark ? theme.palette.primary.main : "#000",
                                "& .MuiListItemText-primary, & .MuiListItemText-secondary": {
                                  color: "#fff",
                                },
                              },
                              ...(disabled && {
                                opacity: 0.5,
                                cursor: "not-allowed",
                              }),
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={variant.mainImagePath}
                                alt={variant.productName}
                                sx={{
                                  border: isDark
                                    ? `1px solid ${theme.palette.divider}`
                                    : "1px solid #e0e0e0",
                                }}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={variant.productName}
                              secondary={`${variant.sizeName} – ${variant.colorName}`}
                              primaryTypographyProps={{
                                fontWeight: 600,
                                color: isDark ? theme.palette.text.primary : "#222",
                              }}
                              secondaryTypographyProps={{
                                color: isDark ? theme.palette.text.secondary : "#555",
                              }}
                            />
                          </ListItemButton>
                        </span>
                      </Tooltip>
                    </ListItem>
                  );
                })}
              </List>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    size="small"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: isDark ? theme.palette.text.primary : "#222",
                        border: isDark
                          ? `1px solid ${theme.palette.divider}`
                          : "1px solid #e0e0e0",
                        borderRadius: 1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: isDark ? theme.palette.primary.main : "#333",
                          color: "#fff",
                        },
                        "&.Mui-selected": {
                          backgroundColor: isDark ? theme.palette.primary.main : "#000",
                          color: "#fff",
                        },
                      },
                    }}
                  />
                )}
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ProductVariantDialogSelect;
