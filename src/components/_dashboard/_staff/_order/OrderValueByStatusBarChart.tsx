import { AssignmentOrderResponse } from "@/type/order";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  orders: AssignmentOrderResponse[];
}

const COLORS = {
  PENDING: "#f59e0b",   // amber-500
  DELIVERED: "#22c55e", // green-500
  CANCELLED: "#ef4444", // red-500
  OTHER: "#6b7280",     // gray-500
};

export default function OrderValueByStatusBarChart({ orders }: Props) {
  // Tính tổng giá trị đơn theo trạng thái
  const totalValueByStatus = orders.reduce<Record<string, number>>((acc, o) => {
    const st = o.order.status;
    acc[st] = (acc[st] || 0) + o.order.orderTotal;
    return acc;
  }, {});

  // Chuyển thành array dữ liệu cho BarChart
  const data = Object.entries(totalValueByStatus).map(([status, total]) => ({
    status,
    total,
    color: COLORS[status as keyof typeof COLORS] || COLORS.OTHER,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Tổng giá trị đơn theo trạng thái
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} />
            <Bar dataKey="total" >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
