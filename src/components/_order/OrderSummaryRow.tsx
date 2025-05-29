import React from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AssignmentOrderResponse } from '@/type/order';
import OrderStatusTag from './OrderStatusTag';

interface Props {
  row: AssignmentOrderResponse;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDoneClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const OrderSummaryRow: React.FC<Props> = ({
  row,
  open,
  setOpen,
  handleDoneClick,
}) => {
  return (
    <TableRow
      hover
      sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      <TableCell>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>

      <TableCell>{row.order?.orderId}</TableCell>
      <TableCell>
        {row.order?.createdDate
          ? new Date(row.order.createdDate).toLocaleDateString()
          : ''}
      </TableCell>
      <TableCell>{row.order?.fullName}</TableCell>
      <TableCell>{row.order?.email}</TableCell>
      <TableCell>{row.order?.phoneNumber}</TableCell>
      <TableCell>
        {[row.order?.address, row.order?.district, row.order?.city]
          .filter(Boolean)
          .join(', ')}
      </TableCell>
      <TableCell>
        {row.assignmentDate
          ? new Date(row.assignmentDate).toLocaleDateString()
          : ''}
      </TableCell>

      <TableCell>
        <OrderStatusTag status={row.order?.status} />
      </TableCell>

      <TableCell>
        {row.order?.orderTotal.toLocaleString()} VND
      </TableCell>
      <TableCell>
        {row.order?.shippingCost.toLocaleString()}
      </TableCell>

      <TableCell>
        {row.order?.status === 'Pending Confirmed' ||
        row.order?.status === 'Paid' ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#111',
              color: '#fff',
              borderRadius: 3,
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#333' },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDoneClick(e);
            }}
          >
            Xác nhận
          </Button>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No Action
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrderSummaryRow;
