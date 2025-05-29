import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";
import dayjs from "dayjs";
import { AssignmentOrderResponse } from "@/type/order";
import weekOfYear from "dayjs/plugin/weekOfYear";


interface Props {
  orders: AssignmentOrderResponse[];
  // option có thể thêm nếu muốn group theo tuần/tháng, mặc định là ngày
  groupBy?: "day" | "week" | "month";
}



export default function OrderTrendChart({ orders, groupBy = "day" }: Props) {
  // Nhóm và tính tổng giá trị đơn theo ngày/tuần/tháng
  const data = useMemo(() => {
    const map: Record<string, number> = {};

    orders.forEach((o) => {
      let key = "";
      const date = dayjs(o.order.createdDate);

      if (groupBy === "week") {
        key = `${date.year()}-W${date.week()}`; // tuần trong năm
      } else if (groupBy === "month") {
        key = date.format("YYYY-MM");
      } else {
        key = date.format("YYYY-MM-DD");
      }

      map[key] = (map[key] || 0) + o.order.orderTotal;
    });

    // Chuyển map thành array và sort theo key (ngày)
    return Object.entries(map)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));
  }, [orders, groupBy]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Xu hướng doanh thu theo {groupBy === "week" ? "tuần" : groupBy === "month" ? "tháng" : "ngày"}
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(val) => `${(val / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(value: number) =>
              value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
            } />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6" // blue-500
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
