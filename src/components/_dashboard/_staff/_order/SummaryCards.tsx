import { AssignmentOrderResponse } from "@/type/order";
import {
  Clock,
  PackageCheck,
  DollarSign,
  Truck,
  Ban
} from "lucide-react";
import classNames from "classnames";

interface Props {
  orders: AssignmentOrderResponse[];
}

export default function SummaryCards({ orders }: Props) {
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, o) => sum + o.order.orderTotal, 0);
  const pending = orders.filter(o => o.order.status === "PENDING").length;
  const delivered = orders.filter(o => o.order.status === "DELIVERED").length;
  const cancelled = orders.filter(o => o.order.status === "CANCELLED").length;

  const cards = [
    {
      label: "Tổng số đơn",
      value: totalOrders,
      icon: PackageCheck,
      color: "text-blue-500 bg-blue-100"
    },
    {
      label: "Tổng giá trị",
      value: `${totalAmount.toLocaleString()} đ`,
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-100"
    },
    {
      label: "Đang xử lý",
      value: pending,
      icon: Clock,
      color: "text-amber-600 bg-amber-100"
    },
    {
      label: "Đã giao",
      value: delivered,
      icon: Truck,
      color: "text-green-600 bg-green-100"
    },
    {
      label: "Đã huỷ",
      value: cancelled,
      icon: Ban,
      color: "text-red-600 bg-red-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, color }, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow p-4"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
          <div className={classNames("p-3 rounded-full", color)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
