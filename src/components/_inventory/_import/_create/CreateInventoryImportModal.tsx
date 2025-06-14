"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Alert,
  Box,
  CircularProgress,
  Switch,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CreateInventoryImportModalHeader from "./CreateInventoryImportModalHeader";
import CreateInventoryImportModalForm from "./CreateInventoryImportModalForm";
import CreateInventoryImportModalActions from "./CreateInventoryImportModalActions";
import { InventoryImportCreateRequest, InventoryImportCreateResponse } from "@/type/createInventoryImport";
import { createInventoryImport } from "@/ultis/importapi";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

interface CreateInventoryImportModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateInventoryImportModal: React.FC<CreateInventoryImportModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const router = useRouter();
  const [formData, setFormData] = useState<InventoryImportCreateRequest>({
    createdBy: 0,
    handleBy: 0,
    wareHouseId: 0,
    isUrgent: false,
    originalImportId: null,
    importDetails: [
      {
        productVariantId: 0,
        costPrice: 0,
        quantity: 0,
        storeDetails: [{ allocatedQuantity: 0, handleBy: 0 }],
      },
    ],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (open) {
      const storedAccount = localStorage.getItem("account");
      if (storedAccount) {
        const account = JSON.parse(storedAccount);
        const storeId = account.roleDetails?.storeId ?? 0;

        setFormData((prev) => ({
          ...prev,
          createdBy: account.accountId,
          handleBy: account.roleDetails?.shopManagerDetailId || account.accountId,
          wareHouseId: storeId,
          importDetails: prev.importDetails.map((detail) => ({
            ...detail,
            storeDetails: detail.storeDetails.map((store) => ({
              ...store,
              wareHouseId: storeId,
              allocatedQuantity: detail.quantity,
              handleBy: account.roleDetails?.shopManagerDetailId || account.accountId,
            })),
          })),
        }));
      }
    }
  }, [open]);

  const handleProductVariantChange = (variantId: number, rowIndex: number) => {
    setFormData((prev) => {
      const newDetails = [...prev.importDetails];
      if (!newDetails[rowIndex]) {
        newDetails[rowIndex] = {
          productVariantId: variantId,
          costPrice: 0,
          quantity: 0,
          storeDetails: [{ allocatedQuantity: 0, handleBy: prev.handleBy }],
        };
      } else {
        newDetails[rowIndex].productVariantId = variantId;
      }
      return { ...prev, importDetails: newDetails };
    });
  };

  const handleCostPriceChange = (rowIndex: number, value: number) => {
    setFormData((prev) => {
      const newDetails = [...prev.importDetails];
      newDetails[rowIndex].costPrice = value;
      return { ...prev, importDetails: newDetails };
    });
  };

  const handleQuantityChange = (rowIndex: number, value: number) => {
    setFormData((prev) => {
      const newDetails = [...prev.importDetails];
      newDetails[rowIndex].quantity = value;
      newDetails[rowIndex].storeDetails = newDetails[rowIndex].storeDetails.map((store) => ({
        ...store,
        allocatedQuantity: value,
      }));
      return { ...prev, importDetails: newDetails };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasNegative = formData.importDetails.some(
      (detail) => detail.costPrice < 0 || detail.quantity < 0
    );
    if (hasNegative) {
      const errMsg = "Giá hoặc số lượng không được âm. Vui lòng kiểm tra lại.";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await createInventoryImport(formData);
      if (response.status) {
        toast.success(response.message);
        onClose();
        onSuccess();
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Submit error:", err);
      const axiosErr = err as AxiosError<Blob>;
      if (axiosErr.response) {
        const blob = axiosErr.response.data;
        const contentType = axiosErr.response.headers["content-type"] || "";
        if (contentType.includes("application/json")) {
          const text = await blob.text();
          const json = JSON.parse(text) as InventoryImportCreateResponse;
          setError(json.message);
          toast.error(json.message);
          setLoading(false);
          return;
        }
      }
      const errMsg = "Có lỗi xảy ra khi tạo phiếu nhập kho.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <CreateInventoryImportModalHeader />
      <DialogContent
        sx={{
          bgcolor: isDark ? theme.palette.background.default : undefined,
          color: isDark ? theme.palette.text.primary : undefined,
        }}
      >
        {error && (
          <Alert
            severity="error"
            sx={{
              bgcolor: isDark ? theme.palette.error.dark : undefined,
              color: isDark ? theme.palette.error.contrastText : undefined,
              mb: 2,
            }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, color: isDark ? theme.palette.text.primary : undefined }}
        >
          <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isUrgent}
                  onChange={() => setFormData({ ...formData, isUrgent: !formData.isUrgent })}
                  disabled={loading}
                  color="primary"
                />
              }
              label="Khẩn Cấp"
              sx={{ color: isDark ? theme.palette.text.primary : undefined }}
            />
          </Box>

          <CreateInventoryImportModalForm
            formData={formData}
            onProductVariantChange={handleProductVariantChange}
            onQuantityChange={handleQuantityChange}
            onChange={setFormData}
            onSubmit={handleSubmit}
            loading={loading}
          />

          <CreateInventoryImportModalActions loading={loading} onCancel={handleCancel} />
        </Box>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress color={isDark ? "inherit" : "primary"} />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateInventoryImportModal;
