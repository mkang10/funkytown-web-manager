import { AssignmentOrderResponse } from "@/type/order";
import dayjs from "dayjs";

interface Props {
  orders: AssignmentOrderResponse[];
}

export default function RecentOrderTable({ orders }: Props) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Danh sách đơn hàng mới nhất
      </h2>

      <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">Mã đơn</th>
            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">Người mua</th>
            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">Ngày tạo</th>
            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">Trạng thái</th>
            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-right">Tổng tiền</th>
            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">
                Không có đơn hàng nào
              </td>
            </tr>
          )}
          {orders.map(({ assignmentId, assignmentDate, comments, order }) => (
            <tr
              key={assignmentId}
              className="even:bg-gray-50 dark:even:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">{order.orderId}</td>
              <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">{order.fullName}</td>
              <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                {dayjs(order.createdDate).format("DD/MM/YYYY")}
              </td>
              <td className="border border-gray-200 dark:border-gray-600 px-4 py-2 capitalize">{order.status}</td>
              <td className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-right">
                {order.orderTotal.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
              </td>
              <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">{comments || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
