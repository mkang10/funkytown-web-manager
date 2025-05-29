import React, { useState } from "react";
import {
  Box,
  Button,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import StatusChip from "./StatusChip";
import RowActions from "./RowActions";
import { StaffInventoryImportStoreDetailDto } from "@/type/importStaff";

interface TableRowItemProps {
  item: StaffInventoryImportStoreDetailDto;
  onCommentClick: (
    item: StaffInventoryImportStoreDetailDto,
    type: "FullStock" | "Shortage"
  ) => void;
}

const TableRowItem = ({ item, onCommentClick }: TableRowItemProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const [showComments, setShowComments] = useState(false);

  const handleClickRow = () => {
    router.push(`/staff-import-requests/${item.importStoreId}`);
  };

  

  return (
    <TableRow
      hover
      onClick={handleClickRow}
      tabIndex={0}
      sx={{
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        borderRadius: 3,
        "&:hover": {
          transform: "scale(1.025)",
          boxShadow: theme.shadows[6],
          backgroundColor: theme.palette.action.hover,
        },
        "&:focus-visible": {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: "2px",
        },
      }}
    >
      <TableCell align="center" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
        <Tooltip title={item.importStoreId.toString()} arrow>
          <span>{item.importStoreId}</span>
        </Tooltip>
      </TableCell>

      <TableCell align="center" sx={{ fontWeight: 600, maxWidth: 180 }}>
        <Tooltip title={item.productName} arrow>
          <Typography noWrap>{item.productName}</Typography>
        </Tooltip>
      </TableCell>

      {!isSmallScreen && (
        <>
          <TableCell align="center" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
            {item.sizeName || "-"}
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
            {item.colorName || "-"}
          </TableCell>
        </>
      )}

      <TableCell
        align="center"
        sx={{
          fontWeight: 700,
          color: theme.palette.success.main,
          minWidth: 70,
          userSelect: "none",
        }}
      >
        {item.allocatedQuantity}
      </TableCell>

      <TableCell
        align="center"
        sx={{
          fontWeight: 700,
          color: item.actualReceivedQuantity == null ? theme.palette.text.disabled : theme.palette.info.main,
          minWidth: 70,
          userSelect: "none",
        }}
      >
        {item.actualReceivedQuantity ?? "-"}
      </TableCell>

      <TableCell align="center">
        <StatusChip status={item.status} />
      </TableCell>


      <TableCell align="center" onClick={(e) => e.stopPropagation()}>
        <RowActions item={item} onCommentClick={onCommentClick} />
      </TableCell>
    </TableRow>
  );
};

export default TableRowItem;
