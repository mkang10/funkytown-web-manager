import React, { useState } from "react";
import {
  Box, Paper, Table, TableBody, TableContainer,
  useTheme, useMediaQuery
} from "@mui/material";
import { toast } from "react-toastify";
import { StaffInventoryImportStoreDetailDto } from "@/type/importStaff";
import { updateFullStock, updateShortage } from "@/ultis/importapi";
import CommentDialog from "./CommentDialog";
import EmptyState from "@/components/_loading/EmptyState";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";

type ActionType = "FullStock" | "Shortage";

interface Props {
  items: StaffInventoryImportStoreDetailDto[];
  loading: boolean;
  onSortChange: (field: string, isDescending: boolean) => void;
  sortBy: string;
  isDescending: boolean;
  refreshData: () => void;
}

export default function StaffImportRequestTable({
  items, loading, onSortChange, sortBy, isDescending, refreshData,
}: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StaffInventoryImportStoreDetailDto | null>(null);
  const [actionType, setActionType] = useState<ActionType>("FullStock");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSortChange = (field: string) => {
    const desc = sortBy === field ? !isDescending : false;
    onSortChange(field, desc);
  };

  const handleCommentDialog = (item: StaffInventoryImportStoreDetailDto, action: ActionType) => {
    setSelectedItem(item);
    setActionType(action);
    setOpenDialog(true);
  };

  const handleCommentSubmit = async (comment: string, actualQty: number) => {
    if (!selectedItem) return;
    try {
      const account = typeof window !== 'undefined' && localStorage.getItem('account');
      const staffId = account ? JSON.parse(account).roleDetails?.staffDetailId || 0 : 0;
      const details = [{ storeDetailId: selectedItem.importStoreId, actualReceivedQuantity: actualQty, comment }];

      const result = actionType === 'FullStock'
        ? await updateFullStock(selectedItem.importId, staffId, details)
        : await updateShortage(selectedItem.importId, staffId, details);

      result.status ? toast.success("Cập nhật thành công") : toast.error(result.message || "Cập nhật thất bại");
      refreshData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Lỗi không xác định");
    } finally {
      setOpenDialog(false);
    }
  };

  if (!loading && items.length === 0) return <EmptyState loading={false} />;

  return (
    <>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer component={Paper} sx={{ borderRadius: 4, mt: 3 }}>
          <Table stickyHeader>
            <TableHeader
              sortBy={sortBy}
              isDescending={isDescending}
              onSortChange={handleSortChange}
            />
            <TableBody>
              {items.map((item) => (
                <TableRowItem
                  key={item.importStoreId}
                  item={item}
                  onCommentClick={handleCommentDialog}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <CommentDialog
        open={openDialog}
        actionType={actionType}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCommentSubmit}
      />
    </>
  );
}
