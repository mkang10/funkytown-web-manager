import React from 'react';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Stack,
} from '@mui/material';
import OrderRow from './OrderRow';
import { AssignmentOrderResponse } from '@/type/order';

interface OrderTableProps {
  rows: AssignmentOrderResponse[];
  loading: boolean;
  rowCount: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onRefresh: () => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ rows, loading, rowCount, page, pageSize, onPageChange, onRefresh }) => {
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress size={60} thickness={5} />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 4 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'black', color: 'white' }}>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ color: 'white' }}>Mã đơn</TableCell>
                  <TableCell sx={{ color: 'white' }}>Ngày tạo</TableCell>
                  <TableCell sx={{ color: 'white' }}>Khách hàng</TableCell>
                  <TableCell sx={{ color: 'white' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white' }}>SĐT</TableCell>
                  <TableCell sx={{ color: 'white' }}>Địa chỉ</TableCell>
                  <TableCell sx={{ color: 'white' }}>Ngày giao</TableCell>
                  <TableCell sx={{ color: 'white' }}>Trạng thái</TableCell>
                  <TableCell sx={{ color: 'white' }}>Tổng tiền</TableCell>
                  <TableCell sx={{ color: 'white' }}>Phí ship</TableCell>
                  <TableCell sx={{ color: 'white' }}>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <OrderRow key={row.assignmentId} row={row} onRefresh={onRefresh} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={2} mt={4} alignItems="center">
            <Pagination
              count={Math.ceil(rowCount / pageSize)}
              page={page}
              onChange={(_, newPage) => onPageChange(newPage)}
              color="standard"
              size="large"
              shape="rounded"
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
            />
          </Stack>
        </>
      )}
    </Box>
  );
};

export default OrderTable;
