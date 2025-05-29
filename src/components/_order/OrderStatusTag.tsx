import {
  CheckCircle,
  Clock,
  Truck,
  Package,
  XCircle,
  BadgeCheck,
  AlertCircle,
} from 'lucide-react';
import React from 'react';

interface OrderStatusTagProps {
  status?: string;
}

const statusConfig: Record<
  string,
  { label: string; icon: JSX.Element; className: string }
> = {
  Paid: {
    label: 'Đã thanh toán',
    icon: <CheckCircle className="w-4 h-4 text-green-600" />,
    className:
      'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700',
  },
  'Pending Confirmed': {
    label: 'Chờ xác nhận',
    icon: <Clock className="w-4 h-4 text-yellow-600" />,
    className:
      'bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700',
  },
  Confirmed: {
    label: 'Đã xác nhận',
    icon: <BadgeCheck className="w-4 h-4 text-blue-600" />,
    className:
      'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700',
  },
  Delivering: {
    label: 'Đang giao',
    icon: <Truck className="w-4 h-4 text-orange-600" />,
    className:
      'bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700',
  },
  Delivered: {
    label: 'Đã giao',
    icon: <Package className="w-4 h-4 text-emerald-600" />,
    className:
      'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700',
  },
  Completed: {
    label: 'Hoàn thành',
    icon: <CheckCircle className="w-4 h-4 text-teal-600" />,
    className:
      'bg-teal-100 text-teal-700 border border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-700',
  },
  Cancelled: {
    label: 'Đã huỷ',
    icon: <XCircle className="w-4 h-4 text-red-600" />,
    className:
      'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700',
  },
};

const OrderStatusTag: React.FC<OrderStatusTagProps> = ({ status }) => {
  const current = statusConfig[status || ''] || {
    label: 'Không xác định',
    icon: <AlertCircle className="w-5 h-5 text-gray-400" />,
    className:
      'text-gray-700 bg-gray-100',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${current.className}`}
      style={{ minWidth: 140 }} // wider minimum width
    >
      {/* Bigger icon */}
      {React.cloneElement(current.icon, { className: 'w-5 h-5' })}

      {/* Add some letter spacing for better readability */}
      <span style={{ whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
        {current.label}
      </span>
    </div>
  );
};

export default OrderStatusTag;
