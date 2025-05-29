import { AssignmentOrderResponse } from "@/type/order";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  orders: { status: string }[]; // chỉ cần trường status
}

const COLORS = {
  PENDING: "#f59e0b",   // amber-500
  DELIVERED: "#22c55e", // green-500
  CANCELLED: "#ef4444", // red-500
  OTHER: "#6b7280",     // gray-500
};

export default function StatusPieChart({ orders }: Props) {
  // Tính số lượng đơn theo trạng thái
  
  const countByStatus = orders.reduce<Record<string, number>>((acc, o) => {
    const st = o.status;
    acc[st] = (acc[st] || 0) + 1;
    return acc;
  }, {});

  // Chuẩn bị data cho PieChart
  const data = Object.entries(countByStatus).map(([status, count]) => ({
    name: status,
    value: count,
    color: COLORS[status as keyof typeof COLORS] || COLORS.OTHER,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Tình trạng đơn hàng
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
