// utils/orderUtils.ts

import { ORDER_STATUS_COLORS } from "@/app/constants/orderStatusColors";
import { OrderChartData, OrderStatusSummary } from "@/type/dashboard";
import { OrderStatus } from "@/type/enum/orderStaatus";


/**
 * Tính summary từ mảng orders, mỗi item có property `status: string`.
 */
export function getOrderStatusSummary(
  orders: { status: string }[]
): OrderStatusSummary {
  // Khởi tạo đầy đủ key
  const summary: OrderStatusSummary = {
    total: orders.length,
    [OrderStatus.PendingConfirm]: 0,
    [OrderStatus.Confimed]:       0,
    [OrderStatus.Completed]:      0,
    [OrderStatus.Paid]:           0,
    [OrderStatus.Cancelled]:      0,
    [OrderStatus.Delivered]:      0,
    [OrderStatus.Delivering]:     0,
  };

  orders.forEach((o) => {
    const st = o.status.trim() as OrderStatus;
    if (st in summary) summary[st]++;
  });

  return summary;
}

/**
 * Sinh chart data từ summary và color map
 */
export function makeOrderChartData(
  summary: OrderStatusSummary
): OrderChartData[] {
  return (Object.values(OrderStatus) as OrderStatus[]).map((status) => ({
    name: status,
    value: summary[status],
    color: ORDER_STATUS_COLORS[status],
  }));
}
