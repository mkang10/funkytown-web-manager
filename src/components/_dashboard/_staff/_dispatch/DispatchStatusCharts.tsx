import {
  DispatchChartDataItem,
  DispatchStatusSummary,
} from "@/type/dashboard";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  chartData: DispatchChartDataItem[];
  summary: DispatchStatusSummary;
};

export default function DispatchStatusCharts({ chartData, summary }: Props) {
  const total = summary.total;

  return (
 <div
      className="w-full bg-white dark:bg-black rounded-2xl p-6 space-y-8
      shadow-md border border-transparent dark:border-white/30
      dark:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)]"
    >      {/* Phần biểu đồ hình tròn và tổng */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-2/3 h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                data={chartData}
                innerRadius={70}
                outerRadius={110}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/3 mt-6 md:mt-0 space-y-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">Tổng số phiếu</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{total}</p>
          </div>
          <div className="space-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.name}: <span className="font-semibold">{item.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biểu đồ thanh ngang */}
      <div className="w-full h-64">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Phân bố trạng thái (biểu đồ thanh)
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={chartData}>
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`bar-cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
