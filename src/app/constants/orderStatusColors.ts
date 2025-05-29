// constants/orderStatusColors.ts

import { OrderStatus } from "@/type/enum/orderStaatus";


export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.PendingConfirm]: "#facc15",  // vàng
  [OrderStatus.Confimed]:       "#38bdf8",  // xanh dương
  [OrderStatus.Completed]:      "#4ade80",  // xanh lá
  [OrderStatus.Paid]:           "#22d3ee",  // xanh biển
  [OrderStatus.Cancelled]:      "#f87171",  // đỏ
  [OrderStatus.Delivered]:      "#a78bfa",  // tím nhạt
  [OrderStatus.Delivering]:     "#fbbf24",  // cam
};
