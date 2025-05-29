import React from 'react';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  useTheme,
} from '@mui/material';

interface OrderDetail {
  orderDetailId: number;
  productName: string;
  imageUrl?: string;
  sizeName?: string;
  colorName?: string;
  quantity: number;
  priceAtPurchase: number;
  discountApplied: number;
}

interface Props {
  open: boolean;
  orderDetails: OrderDetail[] | undefined;
}

const OrderDetailsCollapse: React.FC<Props> = ({ open, orderDetails }) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            margin={2}
            p={3}
            bgcolor={theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa'}
            borderRadius={3}
            boxShadow={theme.palette.mode === 'dark' ? 'none' : 1}
            border={theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none'}
          >
            <Typography
              variant="h6"
              gutterBottom
              fontWeight={600}
              color={theme.palette.text.primary}
              sx={{ mb: 2 }}
            >
              Chi tiết sản phẩm
            </Typography>

            <Table size="small" sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'dark' ? theme.palette.action.hover : '#e9ecef',
                  }}
                >
                  <TableCell sx={{ minWidth: 200, fontWeight: 600 }}>
                    Tên sản phẩm
                  </TableCell>
                  <TableCell sx={{ width: 80, fontWeight: 600 }}>Hình ảnh</TableCell>
                  <TableCell sx={{ minWidth: 80, fontWeight: 600 }}>Kích cỡ</TableCell>
                  <TableCell sx={{ minWidth: 80, fontWeight: 600 }}>Màu sắc</TableCell>
                  <TableCell sx={{ minWidth: 70, fontWeight: 600 }}>Số lượng</TableCell>
                  <TableCell sx={{ minWidth: 110, fontWeight: 600 }}>Giá mua</TableCell>
                  <TableCell sx={{ minWidth: 110, fontWeight: 600 }}>Giảm giá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails?.map((detail) => (
                  <TableRow key={detail.orderDetailId} hover>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {detail.productName}
                    </TableCell>
                    <TableCell>
                      {detail.imageUrl ? (
                        <Box
                          component="img"
                          src={detail.imageUrl}
                          alt={detail.productName}
                          sx={{
                            width: 70,
                            height: 70,
                            objectFit: 'cover',
                            borderRadius: 1,
                            boxShadow: theme.palette.mode === 'dark' ? 'none' : 1,
                            border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none',
                          }}
                        />
                      ) : (
                        '–'
                      )}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {detail.sizeName || '–'}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {detail.colorName || '–'}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {detail.quantity}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {detail.priceAtPurchase.toLocaleString()} VND
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {detail.discountApplied.toLocaleString()} VND
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default OrderDetailsCollapse;
