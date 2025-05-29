// types/dashboard.ts
import { OrderStatus } from "./enum/orderStaatus";

export enum DispatchStatus {
  Processing = "Processing",
  Success = "Success",
}

export type DispatchStatusSummary = {
  total: number;
} & Record<DispatchStatus, number>;

export type DispatchChartDataItem = {
  name: string;
  value: number;
  color: string;
};


export type OrderStatusSummary = {
  total: number;
} & {
  [key in OrderStatus]: number;
};

export interface OrderChartData {
  name: OrderStatus;
  value: number;
  color: string;
}