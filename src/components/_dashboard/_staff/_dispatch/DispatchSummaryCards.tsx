import { DispatchStatusSummary } from "@/type/dashboard";
import { CheckCircle, Loader2, Boxes } from "lucide-react";

type Props = {
  summary: DispatchStatusSummary;
};

const ICONS: Record<string, JSX.Element> = {
  Success: <CheckCircle className="w-6 h-6 text-green-500" />,
  Processing: <Loader2 className="w-6 h-6 text-yellow-500" />,
  Total: <Boxes className="w-6 h-6 text-blue-500" />,
};

export default function DispatchSummaryCards({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Object.entries(summary).map(([key, value]) => (
        <div
          key={key}
          className="
            bg-white dark:bg-black rounded-2xl shadow 
            transition-shadow duration-300 p-5 flex flex-col items-center justify-center text-center
            border border-white border-opacity-20 dark:border-opacity-20
            hover:border-opacity-80 dark:hover:border-opacity-90
            hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.8)]
            dark:hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.9)]
          "
        >
          <div className="mb-2">
            {ICONS[key] ?? <Boxes className="w-6 h-6 text-gray-400 dark:text-gray-600" />}
          </div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
            {key}
          </h3>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}