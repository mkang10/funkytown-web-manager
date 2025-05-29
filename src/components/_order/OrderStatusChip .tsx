import { Chip } from '@mui/material';
import React from 'react';

const getStatusConfig = (status?: string): { color: string; icon: string } => {
  switch (status) {
    case 'Paid':
      return { color: '#000', icon: '💰' };
    case 'Pending Confirmed':
      return { color: '#FFD54F', icon: '⏳' };
    case 'Confirmed':
      return { color: '#42A5F5', icon: '✅' };
    case 'Delivering':
      return { color: '#FFA726', icon: '🚚' };
    case 'Delivered':
      return { color: '#81C784', icon: '📦' };
    case 'Completed':
      return { color: '#66BB6A', icon: '🏁' };
    case 'Cancelled':
      return { color: '#EF5350', icon: '❌' };
    default:
      return { color: '#BDBDBD', icon: '❓' };
  }
};

type OrderStatusChipProps = {
  status?: string;
};

export const OrderStatusChip: React.FC<OrderStatusChipProps> = ({ status }) => {
  const { color, icon } = getStatusConfig(status);

  return (
    <Chip
      label={
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>{icon}</span>
          <span>{status || 'Unknown'}</span>
        </span>
      }
      size="small"
      sx={{
        backgroundColor: color,
        color: '#fff',
        fontWeight: 600,
        borderRadius: '12px',
        paddingX: 1,
        textTransform: 'capitalize',
        fontSize: '0.75rem',
      }}
    />
  );
};
