import { AssignmentOrderFilters } from "@/type/order";
import { useForm } from "react-hook-form";

export interface AssignmentOrderFilterForm {
  orderStatus?: string;
  orderCreatedDateFrom?: string;
  orderCreatedDateTo?: string;
  minOrderTotal?: number;
  maxOrderTotal?: number;
  fullNameContains?: string;
}

interface Props {
  filters: AssignmentOrderFilters;
  onFilter: (filters: AssignmentOrderFilters) => void;
}

export default function AdvancedFilterPanel({ filters, onFilter }: Props) {
  const { register, handleSubmit, reset } = useForm<AssignmentOrderFilterForm>({
    defaultValues: {
      orderStatus: filters.orderStatus || "",
      orderCreatedDateFrom: filters.orderCreatedDateFrom || "",
      orderCreatedDateTo: filters.orderCreatedDateTo || "",
      minOrderTotal: filters.minOrderTotal || undefined,
      maxOrderTotal: filters.maxOrderTotal || undefined,
      fullNameContains: filters.fullNameContains || "",
    },
  });

  const onSubmit = (data: AssignmentOrderFilterForm) => {
    onFilter(data);
  };

  const inputClass = `
  w-full
  border
  border-gray-300 dark:border-gray-600
  rounded-lg
  px-4
  py-3
  min-h-[44px]
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  placeholder-gray-400 dark:placeholder-gray-500
  focus:outline-none
  focus:ring-2
  focus:ring-black dark:focus:ring-white
  focus:shadow-glow
  transition
  duration-300
`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 p-8 bg-white dark:bg-black rounded-xl shadow-lg animate-fade-in "
    >
      <div className="flex flex-col min-w-[220px]">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Trạng thái đơn
        </label>
        <select {...register("orderStatus")} className={inputClass}>
          <option value="">Tất cả</option>
          <option value="PENDING">Đang xử lý</option>
          <option value="DELIVERED">Đã giao</option>
          <option value="CANCELLED">Đã huỷ</option>
        </select>
      </div>

      <div className="flex flex-col min-w-[220px]">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Từ ngày tạo
        </label>
        <input type="date" {...register("orderCreatedDateFrom")} className={inputClass} />
      </div>

      <div className="flex flex-col min-w-[220px]">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide ">
          Đến ngày tạo
        </label>
        <input type="date" {...register("orderCreatedDateTo")} className={inputClass} />
      </div>

      <div className="flex flex-col min-w-[220px]">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Giá trị tối thiểu
        </label>
        <input
          type="number"
          {...register("minOrderTotal")}
          placeholder="VD: 100000"
          min={0}
          step={1000}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col min-w-[220px]">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Giá trị tối đa
        </label>
        <input
          type="number"
          {...register("maxOrderTotal")}
          placeholder="VD: 1000000"
          min={0}
          step={1000}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col min-w-[220px]">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Tên khách hàng
        </label>
        <input
          type="text"
          {...register("fullNameContains")}
          placeholder="Nhập tên"
          autoComplete="off"
          className={inputClass}
        />
      </div>

      <div className="md:col-span-3 flex flex-wrap justify-between items-center pt-6 gap-6">
        <div className="flex gap-2 flex-wrap">
          {[3, 7, 21, 30].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                const today = new Date();
                const from = new Date(today.getTime() - d * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0];
                const to = today.toISOString().split("T")[0];
                onFilter({ ...filters, orderCreatedDateFrom: from, orderCreatedDateTo: to });
              }}
              className="px-4 py-2 text-sm border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {d === 3 ? "3 ngày" : d === 7 ? "7 ngày" : d === 21 ? "3 tuần" : "1 tháng"}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          <button
            type="submit"
            className="bg-black dark:bg-white text-white dark:text-black font-bold uppercase px-10 py-3 rounded-lg shadow-md hover:bg-gray-800 dark:hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white focus:ring-opacity-50 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            LỌC
          </button>

          <button
            type="button"
            onClick={() =>
              reset({
                orderStatus: "",
                orderCreatedDateFrom: "",
                orderCreatedDateTo: "",
                minOrderTotal: undefined,
                maxOrderTotal: undefined,
                fullNameContains: "",
              })
            }
            className="border border-black dark:border-white text-black dark:text-white font-semibold uppercase px-10 py-3 rounded-lg bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white focus:ring-opacity-50 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            XÓA LỌC
          </button>
        </div>
      </div>
    </form>
  );
}
