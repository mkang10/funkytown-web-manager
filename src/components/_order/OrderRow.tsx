import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { completeOrder } from '@/ultis/OrderAPI';
import { AssignmentOrderResponse } from '@/type/order';

import OrderSummaryRow from './OrderSummaryRow';
import OrderDetailsCollapse from './OrderDetailsCollapse';
import OrderAssignDialog from './OrderAssignDialog';
import ConfirmCompleteDialog from './ConfirmCompleteDialog';
import OrderStatusTag from './OrderStatusTag';

interface RowProps {
  row: AssignmentOrderResponse;
  onRefresh: () => void;
}


const OrderRow: React.FC<RowProps> = ({ row, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => setConfirmOpen(false);

  const handleConfirmYes = async () => {
    setConfirmOpen(false);
    try {
      if (row.order?.orderId) {
        await completeOrder(row.order.orderId);
        toast.success('Hoàn thành đơn hàng thành công!');
        onRefresh();
      }
    } catch (error) {
      console.error('Error completing order:', error);
      toast.error('Lỗi khi hoàn thành đơn hàng!');
    }
  };

  return (
    <>
    

      <OrderSummaryRow
        row={row}
        open={open}
        setOpen={setOpen}
        handleDoneClick={handleDoneClick}
      />
      
      <OrderDetailsCollapse
        open={open}
        orderDetails={row.order?.orderDetails}
      />

      <OrderAssignDialog
        open={assignDialogOpen}
        orderId={row.order?.orderId || 0}
        onClose={() => setAssignDialogOpen(false)}
        onAssigned={onRefresh}
      />

      <ConfirmCompleteDialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        onConfirm={handleConfirmYes}
      />
    </>
  );
};

export default OrderRow;
